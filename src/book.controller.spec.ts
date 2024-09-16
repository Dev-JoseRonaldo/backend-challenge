/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { BookController } from './book/book.controller';
import { BookService } from './book/book.service';
import { CreateBookDto } from './book/dto/create-book.dto';
import { UpdateBookDto } from './book/dto/update-book.dto';
import { NotFoundException, BadRequestException } from '@nestjs/common';

describe('BookController', () => {
  let controller: BookController;
  let service: BookService;

  const mockBookService = {
    create: jest.fn((dto: CreateBookDto) => Promise.resolve({ id: 1, ...dto })),
    findAll: jest.fn(() =>
      Promise.resolve([
        {
          id: 1,
          title: 'Test Book',
          author: 'Test Author',
          genre: 'Test Genre',
          year: 2024,
          stock: 10,
        },
      ]),
    ),
    findOne: jest.fn((id: number) => {
      if (id === 1) {
        return Promise.resolve({
          id,
          title: 'Test Book',
          author: 'Test Author',
          genre: 'Test Genre',
          year: 2024,
          stock: 10,
        });
      } else {
        return Promise.reject(
          new NotFoundException(`Book with ID ${id} not found`),
        );
      }
    }),
    update: jest.fn((id: number, dto: UpdateBookDto) => {
      if (id === 1) {
        return Promise.resolve({ id, ...dto });
      } else {
        return Promise.reject(
          new NotFoundException(`Book with ID ${id} not found`),
        );
      }
    }),
    remove: jest.fn((id: number) => {
      if (id === 1) {
        return Promise.resolve();
      } else {
        return Promise.reject(
          new NotFoundException(`Book with ID ${id} not found`),
        );
      }
    }),
    findByGenre: jest.fn((genre: string) => {
      if (genre === 'Test Genre') {
        return Promise.resolve([
          {
            id: 1,
            title: 'Test Book',
            author: 'Test Author',
            genre,
            year: 2024,
            stock: 10,
          },
        ]);
      } else {
        return Promise.reject(
          new BadRequestException('Genre parameter is required'),
        );
      }
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookController],
      providers: [
        {
          provide: BookService,
          useValue: mockBookService,
        },
      ],
    }).compile();

    controller = module.get<BookController>(BookController);
    service = module.get<BookService>(BookService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new book', async () => {
      const dto: CreateBookDto = {
        title: 'Test Book',
        author: 'Test Author',
        genre: 'Test Genre',
        year: 2024,
        stock: 10,
      };
      expect(await controller.create(dto)).toEqual({ id: 1, ...dto });
    });
  });

  describe('findAll', () => {
    it('should return an array of books', async () => {
      expect(await controller.findAll()).toEqual([
        {
          id: 1,
          title: 'Test Book',
          author: 'Test Author',
          genre: 'Test Genre',
          year: 2024,
          stock: 10,
        },
      ]);
    });
  });

  describe('findOne', () => {
    it('should return a book by ID', async () => {
      expect(await controller.findOne('1')).toEqual({
        id: 1,
        title: 'Test Book',
        author: 'Test Author',
        genre: 'Test Genre',
        year: 2024,
        stock: 10,
      });
    });

    it('should throw an exception for a non-existent book', async () => {
      await expect(controller.findOne('2')).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a book', async () => {
      const dto: UpdateBookDto = { title: 'Updated Book' };
      expect(await controller.update('1', dto)).toEqual({ id: 1, ...dto });
    });

    it('should throw an exception for a non-existent book', async () => {
      const dto: UpdateBookDto = { title: 'Updated Book' };
      await expect(controller.update('2', dto)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('remove', () => {
    it('should delete a book', async () => {
      await expect(controller.remove('1')).resolves.not.toThrow();
    });

    it('should throw an exception for a non-existent book', async () => {
      await expect(controller.remove('2')).rejects.toThrow(NotFoundException);
    });
  });

  describe('findByGenre', () => {
    it('should return books by genre', async () => {
      expect(await controller.findByGenre('Test Genre')).toEqual([
        {
          id: 1,
          title: 'Test Book',
          author: 'Test Author',
          genre: 'Test Genre',
          year: 2024,
          stock: 10,
        },
      ]);
    });
  });
});
