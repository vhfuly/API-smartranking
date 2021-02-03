import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Category, CategoryDocument } from './interfaces/category.schema';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Model } from 'mongoose';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { AddPlayerToACategory } from './interfaces/add-player-to-a-category';
import { PlayersService } from 'src/players/players.service';


@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel('Category')
    private readonly categoryModel: Model<CategoryDocument>,
    private readonly playersService: PlayersService,
  ) {}

  async createCategory(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const { category } = createCategoryDto;

    const categoryFound = await this.categoryModel.findOne({category});

    if (categoryFound) {
      throw new BadRequestException(`Categoria ${category} já cadastrada.`);
    }

    const categoryCreated = new this.categoryModel(createCategoryDto)
    return await categoryCreated.save();
  }

  async findAllCategories(): Promise<Category[]> {
    return await this.categoryModel.find().populate('players');
  }

  async findCategory(category: string): Promise<Category>{
    const categoryFound = await this.categoryModel.findOne({category}).populate('players');

    if (!categoryFound){
      throw new NotFoundException(`Category ${category} not found.`)
    }
    return categoryFound
  }

  async updateCategory(
    category: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<void>{
    const categoryFound = await this.categoryModel.findOne({category});
    if (!categoryFound){
      throw new NotFoundException(`Category ${category} not found.`)
    }

    await this.categoryModel.findByIdAndUpdate({category}, {set: updateCategoryDto})
  }

  async addPlayerToACategory(params: AddPlayerToACategory): Promise<void> {
    const { category, idPlayer } = params
    const categoryFound = await this.categoryModel.findOne({category});
    const player = await this.playersService.getPlayerByID(idPlayer);
    if (!categoryFound){
      throw new NotFoundException(`Category ${category} not found.`)
    }
    const registeredPlayer = await this.categoryModel.find({category}).where('players').in([idPlayer])
    if (registeredPlayer.length > 0 ){
      throw new BadRequestException(
        `Player ${idPlayer} already registered in the category ${category}!`)
    }
    categoryFound.players.push(player)
    await this.categoryModel.updateOne({ category }, { $set: categoryFound })
  }
}
