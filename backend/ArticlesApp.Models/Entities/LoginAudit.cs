using System;
using System.Collections.Generic;

namespace ArticlesApp.Data.Models;

public partial class LoginAudit
{
    public int Id { get; set; }

    public int UserId { get; set; }

    public DateTime LoginDate { get; set; }

    public string? IpAddress { get; set; }

    public string? UserAgent { get; set; }

    public bool IsSuccessful { get; set; }

    public virtual User User { get; set; } = null!;
}
