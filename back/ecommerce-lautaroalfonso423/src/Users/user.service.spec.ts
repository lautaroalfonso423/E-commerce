import { Test, TestingModule } from "@nestjs/testing"
import { UserRepository } from "./users.repository";
import { ServiceUsers } from "./users.service";
import { asapScheduler } from "rxjs";

describe("Prueba Jest para ServiceUser", () => {
    let service:ServiceUsers; 
    let repositoryOrder: UserRepository;
    
    const mockRepoUsers = {
        getUsers: jest.fn(),
        getUsersById: jest.fn(),
        modifiedUsers: jest.fn(),
        deleteService: jest.fn(),
        removed: jest.fn()
    }

    beforeEach( async()=>{
    
    const CreateTest:TestingModule = await Test.createTestingModule({
        providers: [ServiceUsers, {
            provide: UserRepository,
            useValue: mockRepoUsers,
        },
    ]
    }).compile();

    service = CreateTest.get<ServiceUsers>(ServiceUsers),
    repositoryOrder = CreateTest.get<UserRepository>(UserRepository)

    });
  


    it("debe estar definido", async()=>{
    expect(service).toBeDefined()
    })
    

    it("debe retornar un usuario",  async()=>{
        const fakeUser = [{id: 1}, {id: 2}]
        mockRepoUsers.getUsers.mockResolvedValue(fakeUser)
        
        const users = await service.getUsers(1, 10)

        expect(users).toEqual(fakeUser)
        expect(mockRepoUsers.getUsers).toHaveBeenCalledWith(1, 10)

    })


    it("debe devolver el id de un usuario", async()=> {

        const userFake = [
            {id:"1", name:"pedro"},
            {id:"2", name: "cacho"}
        ]
        mockRepoUsers.getUsersById.mockResolvedValue(userFake)
        const resolve = await mockRepoUsers.getUsersById("2")

        expect(resolve).toEqual(userFake)
        expect(mockRepoUsers.getUsersById).toHaveBeenCalledWith("2")

    })



    it("debe modificar un usuario", async()=>{

        const modified = {name: "Fernando"}

        const userMoke = [
            {id:"1", ...modified},
            {id:"2", name: "cacho"}
        ]

          mockRepoUsers.getUsersById.mockResolvedValue(userMoke)
        const resolve = await mockRepoUsers.getUsersById("1", modified)

        expect(resolve).toEqual(userMoke)
        expect(mockRepoUsers.getUsersById).toHaveBeenCalledWith("1", modified)

    })


    it("debe eliminar un usuario", async ()=>{
        mockRepoUsers.removed.mockResolvedValue({delete: true})

        const resolve = await  service.deleteService('1');

        expect(resolve).toEqual({delete: true})
        expect(mockRepoUsers.removed).toHaveBeenCalledWith("1")

    })

})
