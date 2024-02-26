namespace AngularApp1.Server.models
{
    public class Product
    {
        public long id { get; set; }
        public string title { get; set; }
        public string description { get; set; }
        public double price { get; set; }
        public double? discountPrice { get; set; }
        public string category { get; set; }
        public string image { get; set; }
    }
}
