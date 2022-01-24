import { Router } from 'express';
import multer from "multer";
import { CreateCategoryController } from '../modules/cars/useCases/createCategory/createCategoryController';
import { ImportCategoryController } from '../modules/cars/useCases/importCategory/ImportCategoryController';
import { ListCategorysController } from '../modules/cars/useCases/listCategorys/listCategorysController';


const categoriesRoutes = Router();

const upload = multer({
  dest: "./tmp"
});

const createCategoryController = new CreateCategoryController();
const listCategoriesController = new ListCategorysController();
const importCategoryController = new ImportCategoryController();

categoriesRoutes.post('/', createCategoryController.handle)

categoriesRoutes.get('/', listCategoriesController.handle)

categoriesRoutes.post('/import', upload.single("file"), importCategoryController.handle);

export { categoriesRoutes };