const request = require("supertest");
const server = require ("../index");

describe("Operaciones CRUD de cafes", () => {
    it ("comprobando respuesta status 200 del servidor y el tipo de dato recibido es un arreglo con por lo menos 1 objeto", async () =>{
        const response = await request(server).get("/cafes").send(); 
        const status = response.statusCode; 
        console.log('cafes', response.body);
        const cafes = response.body; 
        expect(status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
        
        expect(cafes.length).toBeGreaterThan(0);
        const alMenosUnObjeto = cafes.some(cafe => typeof cafe === 'object');
        expect(alMenosUnObjeto).toBe(true);
    });

    it("se obtiene un código 404 al intentar eliminar un café con un id que no existe.", async () => {
        const jwt = "token"; 
        const idDeProductoAEliminar = 6; 
        const response = await request(server).delete(`/cafes/${idDeProductoAEliminar}`).set("Authorization", jwt).send();
        const status = response.statusCode;        
        expect(status).toBe(404);
    });

    it("la ruta POST/cafes agrega un nuevo café y devuelve un código 201.", async () => {
        const id = Math.floor(Math.random() * 999);
        const cafe = {id, nombre : "latte"}
        const response = await request(server).post('/cafes').send(cafe);
        const status = response.statusCode;   
        expect(response.body).toContainEqual(cafe);      
        expect(status).toBe(201);
        
    });
    
    it("PUT/cafes devuelve un statuscode 400 si intentas actualizar un café enviando un id en los parámetros que sea diferente al id dentro del payload", async () => {
        const cafe = {id:8, nombre : "latte"}
        const response = await request(server).put('/cafes/5').send(cafe);
        const status = response.statusCode;        
        expect(status).toBe(400);
    });
});
