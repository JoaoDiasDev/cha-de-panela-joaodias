namespace weddingshower.API.Models
{
    public class Product
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string ImageLink { get; set; }
        public string ProductLink { get; set; }
        public bool Reserved { get; set; }
        public string WhoReserved { get; set; }
    }
}
