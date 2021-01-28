import request from 'supertest'
import appServer from '../appServer'

describe('Test healthzController', () => {
	it('Request /api/healthz should return OK', async () => {
		const result = await request(appServer).get('/api/healthz').send()
		expect(result.status).toBe(200)
		expect(result.body.status).toBe('OK')
	})
})
