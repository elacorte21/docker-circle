import { NextFunction, Request, Response } from 'express'
import { Prisma, PrismaClient } from '@prisma/client'
import ErrorHandler from '../utils/ErrorHandler'

const prisma = new PrismaClient()

export const getAllBooks = async (_: Request, res: Response) => {
    try {
        const books = await prisma.book.findMany()
        return res.status(200).json({ books })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: 'Failed to retrieve books' })
    }
}

export const getUniqueBook = async (
    req: Request,
    res: Response,
    _next: NextFunction
) => {
    try {
        const book = await prisma.book.findUnique({
            where: { id: +req.params.id },
        })

        if (!book) throw new ErrorHandler('Book not found', 404)

        const delay = Math.random() * 4000
        setTimeout(() => {
            return res.status(200).json({ book })
        }, delay)
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: 'Failed to retrieve book' })
    }
}

const purchase = async (id: number) => {
    return await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
        try {
            const book = await tx.book.update({
                where: { id },
                data: { availableStock: { decrement: 1 } },
            })

            if (book.availableStock < 0) {
                throw new Error(
                    `Book '${book.title}' is currently out of stock`
                )
            }
            return book
        } catch (err) {
            if (err instanceof Error) {
                if (/record to update not found/i.test(err.message)) {
                    throw new ErrorHandler('Book not found', 404)
                } else {
                    throw err
                }
            }
        }
    })
}

export const purchaseBook = async (req: Request, res: Response) => {
    try {
        const purchaseChance = Math.random()
        if (purchaseChance < 0.2)
            throw new ErrorHandler(
                'Unable to complete purchase, please try again later.',
                500
            )

        const book = await purchase(+req.params.id)
        return res.status(200).send({ message: 'Purchase successful', book })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: 'Failed to complete purchase' })
    }
}
