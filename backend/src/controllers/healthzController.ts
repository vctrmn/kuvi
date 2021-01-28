import { NextFunction, Request, Response, Router } from 'express'

const router: Router = Router()

router.get('/healthz', async (req: Request, res: Response, next: NextFunction) => {
	try {
		res.status(200).send({ status: 'OK' })
	} catch (e) {
		next(e)
	}
})

export default router
