using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using weddingshower.API.Data;
using weddingshower.API.Models;

namespace weddingshower.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : Controller
    {
        private readonly WeddingShowerDbContext _weddingShowerDbContext;

        public ProductsController(WeddingShowerDbContext weddingShowerDbContext)
        {
            _weddingShowerDbContext = weddingShowerDbContext;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllEmployees()
        {
            var products = await _weddingShowerDbContext.Products.ToListAsync();

            return Ok(products);
        }

        [HttpPost]
        public async Task<IActionResult> AddProduct([FromBody] Product productRequest)
        {
            productRequest.IdProduct = Guid.NewGuid();
            using (var httpclient = new HttpClient())
            {
                var response = await httpclient.GetAsync(productRequest.ImageLink);
                var imageBytes = await response.Content.ReadAsByteArrayAsync();
                productRequest.ImageData = imageBytes;
            }

            await _weddingShowerDbContext.Products.AddAsync(productRequest);
            await _weddingShowerDbContext.SaveChangesAsync();
            return Ok(productRequest);
        }

        [HttpGet]
        [Route("{id:Guid}")]
        public async Task<IActionResult> GetProduct([FromRoute] Guid id)
        {
            var product = await _weddingShowerDbContext.Products.FirstOrDefaultAsync(prod => prod.IdProduct == id);

            if (product == null)
            {
                return NotFound();
            }

            return Ok(product);
        }

        [HttpPut]
        [Route("{id:Guid}")]
        public async Task<IActionResult> UpdateProduct([FromRoute] Guid id, Product updateProductRequest)
        {
            var product = await _weddingShowerDbContext.Products.FindAsync(id);

            if (product == null)
            {
                return NotFound();
            }

            product.Name = updateProductRequest.Name;
            product.ProductLink = updateProductRequest.ProductLink;
            product.ImageLink = updateProductRequest.ImageLink;
            product.Reserved = updateProductRequest.Reserved;
            product.WhoReserved = updateProductRequest.WhoReserved;

            await _weddingShowerDbContext.SaveChangesAsync();

            return Ok(product);
        }

        [HttpDelete]
        [Route("{id:Guid}")]
        public async Task<IActionResult> DeleteProduct([FromRoute] Guid id)
        {
            var product = await _weddingShowerDbContext.Products.FindAsync(id);
            if (product == null)
            {
                return NotFound();
            }

            _weddingShowerDbContext.Products.Remove(product);
            await _weddingShowerDbContext.SaveChangesAsync();
            return Ok(product);
        }

        //[HttpGet("{id}")]
        //[SwaggerResponse(200, "image/jpeg", typeof(byte[]))]
        //public async Task<IActionResult> GetProductImageAsync(Guid id)
        //{
        //    var product = await _weddingShowerDbContext.Products.FirstOrDefaultAsync(prod =>
        //    prod.IdProduct == id);
        //    return File(product.ImageData, "image/jpeg");
        //}
    }
}
