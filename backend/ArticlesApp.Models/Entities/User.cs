using System;
using System.Collections.Generic;

namespace ArticlesApp.Models.Entites;

public partial class User
{
    public int Id { get; set; }

    public string Username { get; set; } = null!;

    public string PasswordHash { get; set; } = null!;

    public bool IsActive { get; set; }

    public DateTime CreatedAt { get; set; }

    public int? CreatedBy { get; set; }

    public DateTime? UpdatedAt { get; set; }

    public int? UpdatedBy { get; set; }

    public virtual ICollection<LoginAudit> LoginAudits { get; set; } = new List<LoginAudit>();

    public virtual ICollection<Role> Roles { get; set; } = new List<Role>();
}
