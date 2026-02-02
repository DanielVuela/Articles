namespace ArticlesApp.Data.Entities
{
    public class UserEntity
    {
        public int Id { get; set; }

        public string Username { get; set; } = null!;

        public string PasswordHash { get; set; } = null!;

        public bool IsActive { get; set; } = true;

        public DateTime CreatedAt { get; set; }

        public int? CreatedBy { get; set; }
    }
}
