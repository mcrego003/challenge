import { HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';
import { AppService } from './app.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { Gender } from './dto/gender.enum';

const mockId = "507f1f77bcf86cd799439011"
class DBModel {
  constructor(private data) {}
  save = jest.fn(() => ({...this.data, _id: mockId}));
  find = jest.fn();
  findOne = jest.fn();
  deleteOne = jest.fn();
}

describe('Subscriptions service', () => {
  let testingModule: TestingModule;
  let service: AppService;
  let spyRepoService: any;
  let spyEmailService: any;

  beforeEach(async () => {
    testingModule = await Test.createTestingModule({
      providers: [
        AppService,
        {
          provide: 'EMAIL_SERVICE',
          useFactory: () => ({
            emit: jest.fn(() => true),
          }),
        },
        {
          provide: 'SUBSCRIPTION_MODEL',
          useValue: DBModel
        },
      ],
    }).compile();

    service = testingModule.get(AppService);
    spyRepoService = testingModule.get('SUBSCRIPTION_MODEL');
    spyEmailService = testingModule.get('EMAIL_SERVICE');
  });


  describe('Get all subscriptions', () => {
    it('Return formatted and filtered fields of subscriptions', async () => {
      const date: Date = new Date();
      const expectedDBResult: any = [
        {
          _id: "507f1f77bcf86cd799439011",
          email: "aa@bb.cc",
          firstName: "mikel",
          gender: Gender.Male,
          dateOfBirth: date,
          consentFlag: true,
          newsletterId: "string",
          otherProperty: "otherValue"
        },
        {
          _id: "507f1f77bcf86cd799439012",
          email: "aa@bb.cc",
          firstName: "mikel2",
          gender: Gender.Male,
          dateOfBirth: date,
          consentFlag: true,
          newsletterId: "string",
          otherProperty: "otherValue"
        }
      ];

      const expectedResult: any = [
        {
          id: "507f1f77bcf86cd799439011",
          email: "aa@bb.cc",
          firstName: "mikel",
          gender: Gender.Male,
          dateOfBirth: date,
          consentFlag: true,
          newsletterId: "string",
        },
        {
          id: "507f1f77bcf86cd799439012",
          email: "aa@bb.cc",
          firstName: "mikel2",
          gender: Gender.Male,
          dateOfBirth: date,
          consentFlag: true,
          newsletterId: "string",
        }
      ];

      spyRepoService.find = jest.fn(() => ({
        exec: () => expectedDBResult
      }))
      const response = await service.getAllSubscriptions();
      expect(spyRepoService.find).toHaveBeenCalled();
      expect(response).toEqual(expectedResult);
    });
  });


  describe('find subscription by id', () => {
    it('Return subscription when found with filtered fields', async () => {
      const date: Date = new Date();
      const id = "507f1f77bcf86cd799439011";
      const expectedDBResult: any = {
        _id: id,
        email: "aa@bb.cc",
        firstName: "mikel",
        gender: Gender.Male,
        dateOfBirth: date,
        consentFlag: true,
        newsletterId: "string",
        otherProperty: "otherValue"
      };

      const expectedResult: any = {
        id,
        email: "aa@bb.cc",
        firstName: "mikel",
        gender: Gender.Male,
        dateOfBirth: date,
        consentFlag: true,
        newsletterId: "string",
      };

      spyRepoService.findById = jest.fn((id) => ({
        exec: () => expectedDBResult
      }))
      const response = await service.getSubscriptionById(id);
      expect(spyRepoService.findById).toHaveBeenCalledWith(id);
      expect(response).toEqual(expectedResult);
    });

    it('Return exception when subscription not found', async () => {
      const id = "507f1f77bcf86cd799439011";
      const expectedDBResult: any = null;

      const expectedErrorBody: any = {
        status: HttpStatus.NO_CONTENT,
        message: 'Could not find product'
      };

      spyRepoService.findById = jest.fn(id => ({
        exec: () => expectedDBResult
      }));
      await expect(service.getSubscriptionById(id)).rejects.toThrowError(expectedErrorBody);
      
      expect(spyRepoService.findById).toHaveBeenCalledWith(id);
    });
  });

  describe('delete subscription by id', () => {
    it('calls repo delete with parameters and returns no data back', async () => {
      const id = "507f1f77bcf86cd799439011";

      spyRepoService.deleteOne = jest.fn(inputObject => ({
        exec: () => true
      }));

      await expect(service.deleteSubscriptionById(id)).resolves.toBe(undefined);
      expect(spyRepoService.deleteOne).toHaveBeenCalledWith({_id: id});

    })
  });

  describe('creates subscription by id', () => {
    it('creates a subscription and emits event pattern', async () => {
      const date: Date = new Date();
      const givenInput: CreateSubscriptionDto = {
        email: "aa@bb.cc",
        firstName: "mikel",
        gender: Gender.Male,
        dateOfBirth: date,
        consentFlag: true,
        newsletterId: "string",
      }

      spyEmailService.emit = jest.fn((eventPattern, data) => of());
      const response = await service.createSubscription(givenInput);
      expect(spyEmailService.emit).toHaveBeenCalledWith('send_subscribe_email', givenInput);
      expect(response).toEqual(mockId);

    })
  });

});
