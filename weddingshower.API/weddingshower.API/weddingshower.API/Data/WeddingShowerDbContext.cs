using Microsoft.EntityFrameworkCore;
using weddingshower.API.Models;

namespace weddingshower.API.Data
{
    public class WeddingShowerDbContext : DbContext
    {
        public WeddingShowerDbContext(DbContextOptions<WeddingShowerDbContext> options) : base(options)
        {
        }

        public DbSet<Product> Products { get; set; }
    }
}
