using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CitizenProposalApp.Migrations
{
    /// <inheritdoc />
    public partial class AddedLikeAndDislike : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "PostDislikedUser",
                columns: table => new
                {
                    DislikedPostsId = table.Column<int>(type: "int", nullable: false),
                    DislikedUsersId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PostDislikedUser", x => new { x.DislikedPostsId, x.DislikedUsersId });
                    table.ForeignKey(
                        name: "FK_PostDislikedUser_Posts_DislikedPostsId",
                        column: x => x.DislikedPostsId,
                        principalTable: "Posts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PostDislikedUser_Users_DislikedUsersId",
                        column: x => x.DislikedUsersId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "PostLikedUser",
                columns: table => new
                {
                    LikedPostsId = table.Column<int>(type: "int", nullable: false),
                    LikedUsersId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PostLikedUser", x => new { x.LikedPostsId, x.LikedUsersId });
                    table.ForeignKey(
                        name: "FK_PostLikedUser_Posts_LikedPostsId",
                        column: x => x.LikedPostsId,
                        principalTable: "Posts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PostLikedUser_Users_LikedUsersId",
                        column: x => x.LikedUsersId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_PostDislikedUser_DislikedUsersId",
                table: "PostDislikedUser",
                column: "DislikedUsersId");

            migrationBuilder.CreateIndex(
                name: "IX_PostLikedUser_LikedUsersId",
                table: "PostLikedUser",
                column: "LikedUsersId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PostDislikedUser");

            migrationBuilder.DropTable(
                name: "PostLikedUser");
        }
    }
}
