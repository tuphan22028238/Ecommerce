import { Category } from '../types/category.type'
import { SuccessResponse } from '../types/utils.type'
import http from './../ultis/http'

const URL = 'categories'

const categoryApi = {
  getCategories() {
    return http.get<SuccessResponse<Category[]>>(URL)
  }
}

export default categoryApi
