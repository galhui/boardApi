import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create_comment.dto';
import { DetailCommnetDto } from './dto/detail_comment.dto';
import { FindCommentQuery } from './dto/find_comment.query';
import { FindCommentResponse } from './dto/find_comment.response';

@ApiTags('comment')
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @ApiOperation({ summary: '댓글 작성 API'})
  @ApiOkResponse({ type: DetailCommnetDto })
  @Post()
  create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentService.create(createCommentDto);
  }

  @ApiOperation({ summary: '댓글 목록 API'})
  @ApiOkResponse({ type: FindCommentResponse })
  @Get()
  findAll(@Query() query: FindCommentQuery) {
    return this.commentService.findAll(query);
  }
}
