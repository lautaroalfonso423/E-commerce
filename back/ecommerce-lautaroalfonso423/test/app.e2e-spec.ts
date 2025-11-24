import { Test, TestingModule } from '@nestjs/testing';
import { ExecutionContext, INestApplication, Param } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from '../src/app.module';
import { AuthGuardToken } from '../src/Auth/guards/auth.guard.token';
import { RoleGuard } from '../src/Auth/guards/role.auth.guard';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
     })
     .overrideGuard(AuthGuardToken)
     .useValue({
      canActivate: (context: ExecutionContext ) => true,
     })
     .overrideGuard(RoleGuard)
     .useValue({
      canActivate: (context: ExecutionContext ) => true,
     })
    .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });


  it("debe retornar el metodo GET /users", async()=>{
    const req = await request(app.getHttpServer()).get("/users")

    expect(req.status).toBe(200)
    expect(req.body).toBeInstanceOf(Array)
  })



  
  it("debe retornar el metodo GET /users/:id", async()=>{
    const req = await request(app.getHttpServer()).get("/users/8d9da3ba-a96a-4191-a900-0690f2e738cb")

    expect(req.status).toBe(200)
    expect(req.body).toBeInstanceOf(Object)
  })

it("debe retornarel error del metodo GET /users/:id", async()=>{
    const req = await request(app.getHttpServer()).get("/users/is-not-uuid")

    expect(req.status).toBe(400)
    expect(req.body).toBeInstanceOf(Object)
  })

   it("debe retornar el error de usuario no econtrado GET /users/:id", async()=>{
    const req = await request(app.getHttpServer()).get("/users/8d9da3ba-a96a-4191-a900-0690f2e738b")

    expect(req.status).toBe(400)
    expect(req.body).toBeInstanceOf(Object)
  })

  it("debe eliminar un usuario GET /users/:id", async()=>{
    const res = await request(app.getHttpServer()).post("/auth/signup").send({

      name: "Juan",
      email:"hola123@gmail.com",
      password:"Hola#1234",
      address: "algo",
      phone: 134556,
      country: "argentina",
      city: "chaco",
      confirmPassword: "Hola#1234"
    })

    const id = res.body.id
  
     const req = await request(app.getHttpServer()).delete(`/users/${id}`)

    expect(req.status).toBe(200)
    expect(req.body).toEqual({id})
  })
});
