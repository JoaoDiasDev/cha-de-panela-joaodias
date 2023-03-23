using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace weddingshower.API.Models
{
    public class Product
    {
        [Key]
        public Guid IdProduct { get; set; }
        public string Name { get; set; }
        public string ImageLink { get; set; }
        public byte[]? ImageData { get; set; }
        public string ProductLink { get; set; }
        [DefaultValue(false)]
        public bool Reserved { get; set; }
        public string WhoReserved { get; set; }
    }
}
