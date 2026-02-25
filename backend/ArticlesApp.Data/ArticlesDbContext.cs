using System;
using System.Collections.Generic;
using ArticlesApp.Models.Entites;
using Microsoft.EntityFrameworkCore;

namespace ArticlesApp.Data;

public partial class ArticlesDbContext : DbContext
{
    public ArticlesDbContext()
    {
    }

    public ArticlesDbContext(DbContextOptions<ArticlesDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<LoginAudit> LoginAudits { get; set; }

    public virtual DbSet<Role> Roles { get; set; }

    public virtual DbSet<Source> Sources { get; set; }

    public virtual DbSet<SourceItem> SourceItems { get; set; }

    public virtual DbSet<User> Users { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<LoginAudit>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__LoginAud__3214EC07D65D3DBA");

            entity.ToTable("LoginAudit");

            entity.Property(e => e.IpAddress).HasMaxLength(50);
            entity.Property(e => e.LoginDate)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.UserAgent).HasMaxLength(300);

            entity.HasOne(d => d.User).WithMany(p => p.LoginAudits)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__LoginAudi__UserI__440B1D61");
        });

        modelBuilder.Entity<Role>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Roles__3214EC07308E3A8B");

            entity.HasIndex(e => e.Name, "UQ__Roles__737584F6306DCCF1").IsUnique();

            entity.Property(e => e.Name).HasMaxLength(50);
        });

        modelBuilder.Entity<Source>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Sources__3214EC07BFFF72D1");

            entity.Property(e => e.ComponentType).HasMaxLength(100);
            entity.Property(e => e.Description).HasMaxLength(500);
            entity.Property(e => e.Name).HasMaxLength(200);
            entity.Property(e => e.Url).HasMaxLength(500);
        });

        modelBuilder.Entity<SourceItem>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__SourceIt__3214EC070C4FA0A3");

            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");

            entity.HasOne(d => d.Source).WithMany(p => p.SourceItems)
                .HasForeignKey(d => d.SourceId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__SourceIte__Sourc__4AB81AF0");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Users__3214EC073733EBC1");

            entity.HasIndex(e => e.Username, "UQ__Users__536C85E4A25BEF24").IsUnique();

            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.IsActive).HasDefaultValue(true);
            entity.Property(e => e.PasswordHash).HasMaxLength(500);
            entity.Property(e => e.UpdatedAt).HasColumnType("datetime");
            entity.Property(e => e.Username).HasMaxLength(100);

            entity.HasMany(d => d.Roles).WithMany(p => p.Users)
                .UsingEntity<Dictionary<string, object>>(
                    "UserRole",
                    r => r.HasOne<Role>().WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FK__UserRoles__RoleI__403A8C7D"),
                    l => l.HasOne<User>().WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("FK__UserRoles__UserI__3F466844"),
                    j =>
                    {
                        j.HasKey("UserId", "RoleId").HasName("PK__UserRole__AF2760ADA44F5B70");
                        j.ToTable("UserRoles");
                    });
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
