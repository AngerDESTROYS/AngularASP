using AngularApp1.Server.models;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace AngularApp1.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly string _jsonFilePath = Path.Combine(Directory.GetCurrentDirectory(), "Data", "products.json");

        [HttpGet]
        public IActionResult GetProducts()
        {
            try
            {
                string json = System.IO.File.ReadAllText(_jsonFilePath);
                var products = JsonSerializer.Deserialize<List<Product>>(json);
                return Ok(products);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet("{id}")]
        public IActionResult GetProduct(long id)
        {
            try
            {
                string json = System.IO.File.ReadAllText(_jsonFilePath);
                var products = JsonSerializer.Deserialize<List<Product>>(json);
                var product = products.FirstOrDefault(p => p.id == id);
                if (product == null)
                    return NotFound("Product not found");
                return Ok(product);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpPost]
        public IActionResult AddProduct([FromBody] Product product)
        {
            try
            {
                string json = System.IO.File.ReadAllText(_jsonFilePath);
                var products = JsonSerializer.Deserialize<List<Product>>(json);

                // Generate a new ID for the product
                long maxId = products.Count > 0 ? products.Max(p => p.id) : 0;
                product.id = maxId + 1;

                // Add the new product to the list
                products.Add(product);

                // Save the updated product list
                var updatedJson = JsonSerializer.Serialize(products);
                System.IO.File.WriteAllText(_jsonFilePath, updatedJson);

                // Return the added product in the response
                return Ok(product);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpPut("{id}")]
        public IActionResult UpdateProduct(long id, [FromBody] Product product)
        {
            try
            {
                string json = System.IO.File.ReadAllText(_jsonFilePath);
                var products = JsonSerializer.Deserialize<List<Product>>(json);
                var existingProduct = products.FirstOrDefault(p => p.id == id);
                if (existingProduct == null)
                    return NotFound("Product not found");

                // Update the existing product
                existingProduct.title = product.title;
                existingProduct.price = product.price;

                // Save the updated product list
                var updatedJson = JsonSerializer.Serialize(products);
                System.IO.File.WriteAllText(_jsonFilePath, updatedJson);

                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteProduct(long id)
        {
            try
            {
                string json = System.IO.File.ReadAllText(_jsonFilePath);
                var products = JsonSerializer.Deserialize<List<Product>>(json);
                var existingProduct = products.FirstOrDefault(p => p.id == id);
                if (existingProduct == null)
                    return NotFound("Product not found");

                // Remove the product from the list
                products.Remove(existingProduct);

                // Save the updated product list
                var updatedJson = JsonSerializer.Serialize(products);
                System.IO.File.WriteAllText(_jsonFilePath, updatedJson);

                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet("category/{category}")]
        public IActionResult GetProductsByCategory(string category)
        {
            try
            {
                string json = System.IO.File.ReadAllText(_jsonFilePath);
                var products = JsonSerializer.Deserialize<List<Product>>(json);

                var filteredProducts = products.Where(p => p.category.ToLower() == category.ToLower()).ToList();

                if (filteredProducts.Count == 0)
                    return NotFound("Products not found for this category");

                return Ok(filteredProducts);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
