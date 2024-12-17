using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CitizenProposalApp.Migrations
{
    /// <inheritdoc />
    public partial class AddedSessionTokenUniqueIndex : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Sessions_Token",
                table: "Sessions",
                column: "Token",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Sessions_Token",
                table: "Sessions");
        }
    }
}
