
const {app} = require('../app')

const supertest = require('supertest')
const request = supertest(app)


    it('GET /usuarios/',  async done=>{
         const res = await request.get('/usuarios/')
        expect(res.status).toBe(200)
        done()
        
    })









