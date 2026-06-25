import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { NutritionService } from './nutrition.service';
import { CreateNutritionDto } from './dto/create-nutrition.dto';
import { UpdateNutritionDto } from './dto/update-nutrition.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from '../roles/roles.guard';
import { Roles } from '../roles/roles.decorator';
import { Role } from '../roles/role.enum';

@ApiTags('Nutrition')
@ApiBearerAuth('token')
@Controller('nutrition')
export class NutritionController {
  constructor(private readonly nutritionService: NutritionService) {}

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN, Role.USER, Role.VET)
  @Post('create-nutrition')
  @ApiOperation({ summary: 'Create nutrition record' })
  create(@Body() createNutritionDto: CreateNutritionDto) {
    return this.nutritionService.create(createNutritionDto);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN, Role.USER, Role.VET)
  @ApiOperation({ summary: 'Get all nutrition records' })
  @Get('all-nutrition')
  findAll() {
    return this.nutritionService.findAll();
  }

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN, Role.USER, Role.VET)
  @ApiOperation({ summary: 'Get nutrition record by ID' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.nutritionService.findOne(+id);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN, Role.USER, Role.VET)
  @ApiOperation({ summary: 'Update nutrition record by ID' })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateNutritionDto: UpdateNutritionDto,
  ) {
    return this.nutritionService.update(+id, updateNutritionDto);
  }

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN, Role.USER, Role.VET)
  @ApiOperation({ summary: 'Delete nutrition record by ID' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.nutritionService.remove(+id);
  }
}
