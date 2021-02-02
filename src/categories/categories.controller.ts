import { Controller, Body, Post, Get, Param, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { Category } from './interfaces/category.interface';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { AddPlayerToACategory } from './interfaces/add-player-to-a-category';

@Controller('api/v1/categories')
export class CategoriesController {

  constructor(
    private readonly categoriesService: CategoriesService
  ) { }

  @Post()
  @UsePipes(ValidationPipe)
  async createCategory(
    @Body()createCategoryDto: CreateCategoryDto
  ): Promise <Category> {
    return await this.categoriesService.createCategory(createCategoryDto);
  }

  @Get()
  async findCategories(): Promise<Category[]> {
    return await this.categoriesService.findAllCategories();
  }

  @Get('/:category')
  async findCategory(
    @Param('category') category: string
  ): Promise<Category> {
    return await this.categoriesService.findCategory(category);
  }

  @Put('/:category')
  @UsePipes(ValidationPipe)
  async updateCategory(
    @Body() updateCategoryDto: UpdateCategoryDto,
    @Param('category') category: string,
  ): Promise<void> {
    await this.categoriesService.updateCategory(category, updateCategoryDto);
  }

  @Post('/:category/players/:idPlayer')
  async addPlayerToACategory(
    @Param() params: AddPlayerToACategory,
  ): Promise<void> {
    return await this.categoriesService.addPlayerToACategory(params)
  }
}
