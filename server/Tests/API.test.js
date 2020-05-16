
const {app} = require('../app')

const supertest = require('supertest')
const request = supertest(app)

//******* */
//USUARIOS
    describe('ENDPOINTS Usuarios', function(){


       it('POST:Test@1  /usuarios/', async done=>{
            const res = await request.post('/usuarios/')
            .send({
                nombre: "Prueba",
                apellido: "Testing",
                email: "Test@1",
                password: "test"
            })
            
            expect(res.status).toBe(200)
            expect(res.body).toBeTruthy()
            // console.log(res.body);
            done()
       });


       it('GET /usuarios/',  async done=>{
        const res = await request.get('/usuarios/')
       expect(res.status).toBe(200)

        // console.log(res.body);
        expect(res.body).toBeTruthy()
        expect(Array.isArray(res.body)).toBe(true)

       done()
       
         });


       it('PUT:Test@1  /usuarios/Test@1', async done=>{
           const res = await request.put('/usuarios/Test@1')
           .send({
            nombre: "PruebaModificada",
            apellido: "Testing2",
            password: "test4"
           })

           expect(res.status).toBe(200)
           expect(res.body).toBeTruthy()
            done()
       });

       it('GET:Test@1 /usuarios/Test@1', async done=>{
           const res = await request.get('/usuarios/Test@1')

           expect(res.status).toBe(200)
           expect(res.body).toBeTruthy()
            done()

       });


       it('DELETE:Test@1  /usuarios/Test@1', async done=>{
           const res = await request.delete('/usuarios/Test@1')

           expect(res.status).toBe(200)
           expect(res.body).toBeTruthy()
           done()
       });

    });
    



  //******* */
//EMPRESAS  
describe('ENDPOINT Empresas', function(){
        
    it('POST:Test@Empresa  /empresas/', async done=>{
        const res = await request.post('/empresas/')
        .send({
            nombre: "PruebaEmpresa",
            password: "testEmpresa",
            email: "Test@Empresa"
            
        })
        
        expect(res.status).toBe(200)
        expect(res.body).toBeTruthy()
        // console.log(res.body);
        done()
     });

     it('GET /empresas/',  async done=>{
        const res = await request.get('/empresas/')
       expect(res.status).toBe(200)

        // console.log(res.body);
        expect(res.body).toBeTruthy()
        expect(Array.isArray(res.body)).toBe(true)

       done()
       
    });

    it('PUT:Test@Empresa  /empresas/Test@Empresa', async done=>{
        const res = await request.put('/empresas/Test@Empresa')
        .send({
        nombre: "PruebaEmpresaModificada",
        password: "testEmpresaM"
        })

        expect(res.status).toBe(200)
        expect(res.body).toBeTruthy()
        done()
    });


    it('GET:Test@Empresa /empresas/Test@Empresa', async done=>{
        const res = await request.get('/empresas/Test@Empresa')

        expect(res.status).toBe(200)
        expect(res.body).toBeTruthy()
         done()

    });


    it('DELETE:Test@Empresas  /empresas/Test@Empresa', async done=>{
        const res = await request.delete('/empresas/Test@Empresa')

        expect(res.status).toBe(200)
        expect(res.body).toBeTruthy()
        done()
    });


});





//******* */
//OFERTAS
describe('ENDPOINT Ofertas', function(){

    //Se necesita crear una emprsa y un usuario para crear una oferta
    it('POST: Crear Usuario y Empresa para la oferta', async done=>{
        const resCompany = await request.post('/empresas/')
        .send({
            nombre: "PruebaEmpresa",
            password: "testEmpresa",
            email: "Test@Empresa"
            
        })
        

        const resUser = await request.post('/usuarios/')
        .send({
            nombre: "Prueba",
            apellido: "Testing",
            email: "Test@1",
            password: "test"
        })

        expect(resCompany.status).toBe(200)
        expect(resUser.status).toBe(200)
        done()
    });


    it('POST /ofertas/', async done=>{
        const res = await request.post('/ofertas/')
        .send({
            emailUsuario: "Test@1",
            emailEmpresa: "Test@Empresa",
            salario: 30000,
            tiempoContratacion: 3
        })


        expect(res.status).toBe(200)
        expect(res.body).toBeTruthy()
        done()
    })


    it('GET /ofertas/',  async done=>{
        const res = await request.get('/ofertas/')
       expect(res.status).toBe(200)

        // console.log(res.body);
        expect(res.body).toBeTruthy()
        expect(Array.isArray(res.body)).toBe(true)

       done()
   });


   it('GET /ofertas/Test@Empresa/Test@1',  async done=>{
    const res = await request.get('/ofertas/Test@Empresa/Test@1')
   expect(res.status).toBe(200)

    // console.log(res.body);
    expect(res.body).toBeTruthy()
    expect(Array.isArray(res.body)).toBe(true)

   done()
    });



   it('GET /ofertas/usuario/Test@1',  async done=>{
    const res = await request.get('/ofertas/usuario/Test@1')
   expect(res.status).toBe(200)

    // console.log(res.body);
    expect(res.body).toBeTruthy()
    expect(Array.isArray(res.body)).toBe(true)

   done()
    });

    it('GET /ofertas/empresa/Test@Empresa',  async done=>{
        const res = await request.get('/ofertas/empresa/Test@Empresa')
       expect(res.status).toBe(200)

        // console.log(res.body);
        expect(res.body).toBeTruthy()
        expect(Array.isArray(res.body)).toBe(true)

       done()
        });



   it('PUT /ofertas/Test@Empresa/Test@1', async done=>{
    const res = await request.put('/ofertas/Test@Empresa/Test@1')
    .send({
        salario: 9999,
        tiempoContratacion: 38,
        estado: "Terminada"
    })
    expect(res.status).toBe(200)
    expect(res.body).toBeTruthy()
    done()
});

it('DELETE /ofertas/Test@Empresa/Test@1', async done=>{
   
    const res = await request.delete('/ofertas/Test@Empresa/Test@1')
    

    expect(res.status).toBe(200)
    expect(res.body).toBeTruthy()
    done()
});

it('DELETE Usuario y empresa creada para oferta', async done=>{
    const resUser = await request.delete('/usuarios/Test@1')
       

    const resCompany = await request.delete('/empresas/Test@Empresa')
       

        expect(resCompany.status).toBe(200)
        expect(resUser.status).toBe(200)
        done()
});

})



