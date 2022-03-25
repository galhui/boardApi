import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create_board.dto';
import { DetailBoardDto } from './dto/detail_board.dto';
import { FindBoardQuery } from './dto/find_board.query';
import { FindBoardResponse } from './dto/find_board.response';
import { UpdateBoardDto } from './dto/update_board.dto';

@ApiTags('board')
@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @ApiOperation({ summary: '게시글 작성 API'})
  @ApiOkResponse({ type: DetailBoardDto })
  @Post()
  create(@Body() createBoardDto: CreateBoardDto) {
    return this.boardService.create(createBoardDto);
  }

  @ApiOperation({ summary: '게시글 목록 API'})
  @ApiOkResponse({ type: FindBoardResponse})
  @Get()
  findAll(@Query() query: FindBoardQuery) {
    return this.boardService.findAll(query);
  }

  @ApiOperation({ summary: '게시글 상세 API '})
  @ApiOkResponse({ type: DetailBoardDto })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.boardService.findOne(id);
  }

  @ApiOperation({ summary: '게시글 수정 API'})
  @ApiOkResponse({ type: DetailBoardDto })
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateBoardDto: UpdateBoardDto) {
    return this.boardService.update(id, updateBoardDto);
  }

  @ApiOperation({ summary: '게시글 삭제 API'})
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.boardService.remove(id);
  }
}
