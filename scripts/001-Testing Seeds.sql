--Creacion de roles
INSERT INTO Roles (Name) VALUES ('Admin'), ('User');
GO

--Crear usuario
INSERT INTO Users (Username, PasswordHash)
VALUES ('admin', 'TEMP_HASH');
GO

--Asignar rol a usuario 
INSERT INTO UserRoles (UserId, RoleId)
VALUES (1, 1); -- admin -> Admin
GO

-- Crear un source
INSERT INTO "Sources" ( Url, Name, Description, ComponentType, RequiresSecret)
VALUES ('test.com', 'test', 'test description', 'khe', 0)
GO