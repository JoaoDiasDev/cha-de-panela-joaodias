using Microsoft.EntityFrameworkCore;
using weddingshower.API.Models;

namespace weddingshower.API.Data
{
    public class WeddingShowerDbContext : DbContext
    {
        public WeddingShowerDbContext(DbContextOptions options) : base(options)
        {
        }

        DbSet<Product> Products { get; set; }
    }
}
