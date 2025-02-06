import { Router, IRouter } from "express";
import { createProduct, deleteProduct, getProductById, getProducts, updateAvailability, updateProduct } from "./handlers/product";
import { body, param } from "express-validator";
import { handleInputErrors } from "./middleware";

const router: IRouter = Router();

/**
 * @swagger
 * components: 
 *    schemas:
 *        Product:
 *            type: object
 *            properties: 
 *                id:
 *                    type: integer
 *                    description: The Product ID
 *                    example: 1
 *                name: 
 *                    type: string
 *                    description: The Product name
 *                    example: Curved Monitor
 *                price:
 *                    type: number
 *                    description: The Product price
 *                    example: 300
 *                availability:
 *                    type: boolean
 *                    description: The Product availability
 *                    example: true
 */


/**
 * @swagger
 * /api/products:
 *    get:
 *        summary: Get a list of products
 *        tags:
 *            - Products
 *        description: Return a list of products
 *        responses:
 *            200:
 *                description: Successful response
 *                content: 
 *                    application/json:
 *                        schema:
 *                            type: array
 *                            items:
 *                                $ref: '#/components/schemas/Product'
 *              
 */
router.get("/", getProducts);


/**
 * @swagger
 * /api/products/{id}:
 *    get:
 *        summary: Get a product by ID
 *        tags:
 *            - Products
 *        description: Return a product based in its unique ID
 *        parameters:
 *          - in: path
 *            name: id
 *            description: The ID of the product to retrieve
 *            required: true
 *            schema: 
 *                type: integer
 *        responses:
 *            200:
 *                descriptioon: Successful response
 *                content:
 *                    application/json:
 *                        schema:
 *                            #ref: '#/components'/schema/product
 *            404:
 *                description: Not found
 *            400:
 *                description: Bad Request - Invalid ID
 *            
 * 
 * 
 */
router.get("/:id", 

  // Validation
  param("id").isInt().withMessage("The id  must be an integer"),
  
  handleInputErrors,
  getProductById
);

/**
 * @swagger
 * /api/products:
 *    post:
 *        summary: Creates a new product
 *        tags:
 *            - Products
 *        descripction: Returns a new record in the database
 *        requestBody:
 *            required: true
 *            content:
 *                application/json:
 *                    schema:
 *                        type: object
 *                        properties:
 *                            name:
 *                                type: string
 *                                example: "Curver Monitor"
 *                            price:
 *                                type: number
 *                                example: 300
 *        responses:
 *            201:
 *                description: Successful response
 *                content:
 *                    application/json:
 *                        schema:
 *                            $ref: '#/components/schemas/Product'
 *            400:
 *                description: Bad request - Invalid input ID
 */

router.post("/", 
  
  // Validation
  body("name").notEmpty().withMessage("Product's name is required"),

  body("price")
    .isNumeric().withMessage("The value is not valid")
    .custom( value => value => 0 ).withMessage("The value must be greater than 0")
    .notEmpty().withMessage("Product's price is required"),

  handleInputErrors,
  
  createProduct

);

/**
 * @swagger
 * /api/products/{id}:
 *    put:
 *        summary: Updates a podruct with user input
 *        tags: 
 *            - Products
 *        description: Returns the updated product
 *        parameters:
 *          - in: path
 *            name: id
 *            description: The ID of the product to retrieve
 *            required: true
 *            schema: 
 *                type: integer
 *        requestBody:
 *            required: true
 *            content:
 *                application/json:
 *                    schema:
 *                        type: object
 *                        properties:
 *                            name:
 *                                type: string
 *                                example: "Curver Monitor"
 *                            price:
 *                                type: number
 *                                example: 300
 *                            availability:
 *                                type: boolean
 *                                example: true
 *        responses:
 *            200:
 *                description: Successful response
 *                content:
 *                    application/json:
 *                        schema:
 *                            $ref: '#/components/schemas/Product'
 *            400:
 *                description: Bad request - Invalid ID or invalid input data
 *            404:
 *                description: Product Not Found
 */

router.put(
  "/:id",

  // Validation

  param("id").isInt().withMessage("The id  must be an integer"),

  body("name").notEmpty().withMessage("Product's name is required"),

  body("price")
    .isNumeric()
    .withMessage("The value is not valid")
    .custom((value) => (value) => 0)
    .withMessage("The value must be greater than 0")
    .notEmpty()
    .withMessage("Product's price is required"),

  body("availability").isBoolean().withMessage("The value is not valid"),

  handleInputErrors,

  updateProduct
);

/**
 * @swagger
 * /api/products/{id}:
 *    patch:
 *        summary: Update Product availability
 *        tags:
 *            - Products
 *        description: Returns the updated availability
 *        parameters:
 *          - in: path
 *            name: id
 *            description: The ID of the product to retrieve
 *            required: true
 *            schema: 
 *                type: integer
 *        responses:
 *            200:
 *                description: Successful response
 *                content:
 *                    application/json:
 *                        schema:
 *                            $ref: '#/components/schemas/Product'
 *            400:
 *                description: Bad request - Invalid ID
 *            404:
 *                description: Product Not Found
 */

router.patch("/:id",

  // Validation
  param("id").isInt().withMessage("The id  must be an integer"),

  handleInputErrors,
  updateAvailability
);

/**
 * @swagger
 * /api/products/{id}:
 *    delete:
 *        summary: Deletes a Product by a given ID
 *        tags:
 *            - Products
 *        description: Returns a confirmation message
 *        parameters:
 *          - in: path
 *            name: id
 *            description: The ID of the product to delete
 *            required: true
 *            schema: 
 *                type: integer
 *        responses:
 *            200:
 *                description: Successful response
 *                content:
 *                    application/json:
 *                        schema:
 *                            type: string
 *                            value: 'The product was eliminated'
 *            400:
 *                description: Bad request - Invalid ID
 *            404:
 *                description: Product Not Found
 */

router.delete("/:id", 
  
  // Validation
  param("id").isInt().withMessage("The id must be an integer"),

  handleInputErrors,
  deleteProduct
);

export default router;