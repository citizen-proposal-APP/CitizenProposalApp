﻿using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace CitizenProposalApp.Migrations
{
    /// <inheritdoc />
    public partial class AddedPostAndTagDataSeed : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Posts",
                columns: new[] { "Id", "Content", "PostedTime", "Title", "UserId" },
                values: new object[,]
                {
                    { 1, "隨著全球氣候變遷，農產品供需波動日益劇烈，國內農業生產也受到影響，常常造成價格起伏不定，影響農民收益。建議農業部建立更加透明且即時的農產品產銷資訊平台，讓消費者和農民可以即時掌握市場供需狀況，達到價格穩定和市場均衡的目的。透過這樣的平台，農民可以根據市場資訊調整生產策略，而消費者也能更加理解價格變動的原因，減少市場誤解，進一步穩定農業經濟。", new DateTime(2024, 6, 9, 4, 2, 0, 0, DateTimeKind.Unspecified), "加強國內農產品產銷資訊透明化", null },
                    { 2, "中小企業是國內經濟的重要支柱，但面臨大型企業壟斷的競爭壓力不斷增加。建議公平交易委員會進一步強化對於中小企業的保護，特別是在制定反壟斷法規和規範市場行為方面，提供更加透明的申訴管道和具體的罰則，保障中小企業在市場上的公平競爭環境，進一步促進經濟的多元化與可持續發展。", new DateTime(2024, 6, 9, 4, 2, 0, 0, DateTimeKind.Unspecified), "加強中小企業反壟斷保護措施", null },
                    { 3, "隨著人口老齡化趨勢日益加劇，老年人的醫療需求不斷上升。建議衛生福利部提供更多針對老年人的專屬醫療資源，特別是擴充護理機構及社區醫療網絡，並加強老年人健康管理的宣導。透過提高醫療資源的可及性，讓更多長者可以獲得良好的醫療照顧，減輕家庭照顧的壓力，提升全社會的福利水平。", new DateTime(2024, 6, 9, 4, 2, 0, 0, DateTimeKind.Unspecified), "提高老年人福利及醫療資源", null },
                    { 4, "隨著交通量增加，交通事故的頻率和嚴重程度也有所提升，建議交通部實施一系列減少交通事故的措施，例如改善危險路段的道路設計，加強酒駕管制，並推廣道路安全教育，尤其是對青少年進行交通安全意識的培訓。透過這些措施，可以有效降低交通事故發生的風險，保護公共安全。", new DateTime(2024, 6, 9, 4, 2, 0, 0, DateTimeKind.Unspecified), "建立交通事故減少措施", null },
                    { 5, "文化創意產業在推動經濟成長和提升國際影響力方面扮演重要角色。建議文化部擴充對文化創意產業的支持，例如提供更多資金補助、稅收優惠，並搭建國際平台，協助文創企業向國際市場拓展。通過這些措施，不僅能提高文化創意的產值，還可以提升國家的文化形象和軟實力。", new DateTime(2024, 6, 9, 4, 2, 0, 0, DateTimeKind.Unspecified), "加強文化創意產業的支持政策", null },
                    { 6, "國防科技人才對於國防安全至關重要。建議國防部設立專門的科技人才培育計畫，特別是在人工智慧、網絡安全等領域，加強與國內外頂尖學府和科研機構的合作，吸引年輕人才投入國防科技的研發中。透過這種方式，能提升國防科技的自主性與創新能力，確保國家安全。", new DateTime(2024, 6, 9, 4, 2, 0, 0, DateTimeKind.Unspecified), "建立國防科技人才培育體系", null },
                    { 7, "為了提升全體公民的生活品質，建議內政部推動更多無障礙設施的建設，包括公共交通系統、公共建築和街道設施，以便於身障人士和老年人能夠安全方便地出行。透過建立更加無障礙的社會環境，可以實現更加平等和包容的社會。", new DateTime(2024, 6, 9, 4, 2, 0, 0, DateTimeKind.Unspecified), "加速無障礙公共設施建設", null },
                    { 8, "建議農業部推廣環境友善的農業技術，尤其是在農藥和肥料的使用上，應推動有機農業並提供相應的技術培訓和補助政策，以減少農業對環境的污染，維護生態平衡，並保障消費者的健康。", new DateTime(2024, 6, 9, 4, 2, 0, 0, DateTimeKind.Unspecified), "促進環境友善農業", null },
                    { 9, "隨著數位化政務的推廣，資安問題變得越來越重要。建議國家通訊傳播委員會進一步提升數位政務系統的資安標準，並定期進行測試，確保市民個人資料的安全。同時，推動政府部門的資安知識培訓，提升資安意識，保障政府系統的穩定運行。", new DateTime(2024, 6, 9, 4, 2, 0, 0, DateTimeKind.Unspecified), "加強數位政務與資安防護", null },
                    { 10, "青少年面臨學業和生活壓力增加，心理健康問題日益嚴重。建議衛生福利部設立青少年心理健康支持專線和線上諮詢服務，並在學校內提供專業的心理健康教育，幫助青少年培養健康的心態和情緒管理能力，減少心理健康問題的發生。", new DateTime(2024, 6, 9, 4, 2, 0, 0, DateTimeKind.Unspecified), "強化青少年心理健康支持體系", null }
                });

            migrationBuilder.InsertData(
                table: "Tags",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { 1, "農業資訊" },
                    { 2, "價格透明化" },
                    { 3, "農業政策" },
                    { 4, "交通部" },
                    { 5, "中小企業" },
                    { 6, "反壟斷" },
                    { 7, "經濟多元化" },
                    { 8, "公平交易委員會" },
                    { 9, "老年人福利" },
                    { 10, "醫療資源" },
                    { 11, "健康管理" },
                    { 12, "衛生福利部" },
                    { 13, "交通安全" },
                    { 14, "酒駕防治" },
                    { 15, "公共安全" },
                    { 16, "行政院主計總處" },
                    { 17, "文化創意" },
                    { 18, "經濟成長" },
                    { 19, "國際市場" },
                    { 20, "文化部" },
                    { 21, "國防科技" },
                    { 22, "人才培育" },
                    { 23, "人工智慧" },
                    { 24, "國防部" },
                    { 25, "無障礙設施" },
                    { 26, "公共建設" },
                    { 27, "包容性社會" },
                    { 28, "內政部" },
                    { 29, "環境友善農業" },
                    { 30, "生態平衡" },
                    { 31, "農業技術" },
                    { 32, "農業部" },
                    { 33, "數位政務" },
                    { 34, "資安防護" },
                    { 35, "個人資料保護" },
                    { 36, "國家通訊傳播委員會" },
                    { 37, "青少年心理健康" },
                    { 38, "心理支持" },
                    { 39, "教育推廣" },
                    { 40, "教育部" }
                });

            migrationBuilder.InsertData(
                table: "PostTag",
                columns: new[] { "PostsId", "TagsId" },
                values: new object[,]
                {
                    { 1, 1 },
                    { 1, 2 },
                    { 1, 3 },
                    { 1, 4 },
                    { 2, 5 },
                    { 2, 6 },
                    { 2, 7 },
                    { 2, 8 },
                    { 3, 9 },
                    { 3, 10 },
                    { 3, 11 },
                    { 3, 12 },
                    { 4, 13 },
                    { 4, 14 },
                    { 4, 15 },
                    { 4, 16 },
                    { 5, 17 },
                    { 5, 18 },
                    { 5, 19 },
                    { 5, 20 },
                    { 6, 21 },
                    { 6, 22 },
                    { 6, 23 },
                    { 6, 24 },
                    { 7, 25 },
                    { 7, 26 },
                    { 7, 27 },
                    { 7, 28 },
                    { 8, 29 },
                    { 8, 30 },
                    { 8, 31 },
                    { 8, 32 },
                    { 9, 33 },
                    { 9, 34 },
                    { 9, 35 },
                    { 9, 36 },
                    { 10, 37 },
                    { 10, 38 },
                    { 10, 39 },
                    { 10, 40 }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "PostTag",
                keyColumns: new[] { "PostsId", "TagsId" },
                keyValues: new object[] { 1, 1 });

            migrationBuilder.DeleteData(
                table: "PostTag",
                keyColumns: new[] { "PostsId", "TagsId" },
                keyValues: new object[] { 1, 2 });

            migrationBuilder.DeleteData(
                table: "PostTag",
                keyColumns: new[] { "PostsId", "TagsId" },
                keyValues: new object[] { 1, 3 });

            migrationBuilder.DeleteData(
                table: "PostTag",
                keyColumns: new[] { "PostsId", "TagsId" },
                keyValues: new object[] { 1, 4 });

            migrationBuilder.DeleteData(
                table: "PostTag",
                keyColumns: new[] { "PostsId", "TagsId" },
                keyValues: new object[] { 2, 5 });

            migrationBuilder.DeleteData(
                table: "PostTag",
                keyColumns: new[] { "PostsId", "TagsId" },
                keyValues: new object[] { 2, 6 });

            migrationBuilder.DeleteData(
                table: "PostTag",
                keyColumns: new[] { "PostsId", "TagsId" },
                keyValues: new object[] { 2, 7 });

            migrationBuilder.DeleteData(
                table: "PostTag",
                keyColumns: new[] { "PostsId", "TagsId" },
                keyValues: new object[] { 2, 8 });

            migrationBuilder.DeleteData(
                table: "PostTag",
                keyColumns: new[] { "PostsId", "TagsId" },
                keyValues: new object[] { 3, 9 });

            migrationBuilder.DeleteData(
                table: "PostTag",
                keyColumns: new[] { "PostsId", "TagsId" },
                keyValues: new object[] { 3, 10 });

            migrationBuilder.DeleteData(
                table: "PostTag",
                keyColumns: new[] { "PostsId", "TagsId" },
                keyValues: new object[] { 3, 11 });

            migrationBuilder.DeleteData(
                table: "PostTag",
                keyColumns: new[] { "PostsId", "TagsId" },
                keyValues: new object[] { 3, 12 });

            migrationBuilder.DeleteData(
                table: "PostTag",
                keyColumns: new[] { "PostsId", "TagsId" },
                keyValues: new object[] { 4, 13 });

            migrationBuilder.DeleteData(
                table: "PostTag",
                keyColumns: new[] { "PostsId", "TagsId" },
                keyValues: new object[] { 4, 14 });

            migrationBuilder.DeleteData(
                table: "PostTag",
                keyColumns: new[] { "PostsId", "TagsId" },
                keyValues: new object[] { 4, 15 });

            migrationBuilder.DeleteData(
                table: "PostTag",
                keyColumns: new[] { "PostsId", "TagsId" },
                keyValues: new object[] { 4, 16 });

            migrationBuilder.DeleteData(
                table: "PostTag",
                keyColumns: new[] { "PostsId", "TagsId" },
                keyValues: new object[] { 5, 17 });

            migrationBuilder.DeleteData(
                table: "PostTag",
                keyColumns: new[] { "PostsId", "TagsId" },
                keyValues: new object[] { 5, 18 });

            migrationBuilder.DeleteData(
                table: "PostTag",
                keyColumns: new[] { "PostsId", "TagsId" },
                keyValues: new object[] { 5, 19 });

            migrationBuilder.DeleteData(
                table: "PostTag",
                keyColumns: new[] { "PostsId", "TagsId" },
                keyValues: new object[] { 5, 20 });

            migrationBuilder.DeleteData(
                table: "PostTag",
                keyColumns: new[] { "PostsId", "TagsId" },
                keyValues: new object[] { 6, 21 });

            migrationBuilder.DeleteData(
                table: "PostTag",
                keyColumns: new[] { "PostsId", "TagsId" },
                keyValues: new object[] { 6, 22 });

            migrationBuilder.DeleteData(
                table: "PostTag",
                keyColumns: new[] { "PostsId", "TagsId" },
                keyValues: new object[] { 6, 23 });

            migrationBuilder.DeleteData(
                table: "PostTag",
                keyColumns: new[] { "PostsId", "TagsId" },
                keyValues: new object[] { 6, 24 });

            migrationBuilder.DeleteData(
                table: "PostTag",
                keyColumns: new[] { "PostsId", "TagsId" },
                keyValues: new object[] { 7, 25 });

            migrationBuilder.DeleteData(
                table: "PostTag",
                keyColumns: new[] { "PostsId", "TagsId" },
                keyValues: new object[] { 7, 26 });

            migrationBuilder.DeleteData(
                table: "PostTag",
                keyColumns: new[] { "PostsId", "TagsId" },
                keyValues: new object[] { 7, 27 });

            migrationBuilder.DeleteData(
                table: "PostTag",
                keyColumns: new[] { "PostsId", "TagsId" },
                keyValues: new object[] { 7, 28 });

            migrationBuilder.DeleteData(
                table: "PostTag",
                keyColumns: new[] { "PostsId", "TagsId" },
                keyValues: new object[] { 8, 29 });

            migrationBuilder.DeleteData(
                table: "PostTag",
                keyColumns: new[] { "PostsId", "TagsId" },
                keyValues: new object[] { 8, 30 });

            migrationBuilder.DeleteData(
                table: "PostTag",
                keyColumns: new[] { "PostsId", "TagsId" },
                keyValues: new object[] { 8, 31 });

            migrationBuilder.DeleteData(
                table: "PostTag",
                keyColumns: new[] { "PostsId", "TagsId" },
                keyValues: new object[] { 8, 32 });

            migrationBuilder.DeleteData(
                table: "PostTag",
                keyColumns: new[] { "PostsId", "TagsId" },
                keyValues: new object[] { 9, 33 });

            migrationBuilder.DeleteData(
                table: "PostTag",
                keyColumns: new[] { "PostsId", "TagsId" },
                keyValues: new object[] { 9, 34 });

            migrationBuilder.DeleteData(
                table: "PostTag",
                keyColumns: new[] { "PostsId", "TagsId" },
                keyValues: new object[] { 9, 35 });

            migrationBuilder.DeleteData(
                table: "PostTag",
                keyColumns: new[] { "PostsId", "TagsId" },
                keyValues: new object[] { 9, 36 });

            migrationBuilder.DeleteData(
                table: "PostTag",
                keyColumns: new[] { "PostsId", "TagsId" },
                keyValues: new object[] { 10, 37 });

            migrationBuilder.DeleteData(
                table: "PostTag",
                keyColumns: new[] { "PostsId", "TagsId" },
                keyValues: new object[] { 10, 38 });

            migrationBuilder.DeleteData(
                table: "PostTag",
                keyColumns: new[] { "PostsId", "TagsId" },
                keyValues: new object[] { 10, 39 });

            migrationBuilder.DeleteData(
                table: "PostTag",
                keyColumns: new[] { "PostsId", "TagsId" },
                keyValues: new object[] { 10, 40 });

            migrationBuilder.DeleteData(
                table: "Posts",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Posts",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Posts",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Posts",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Posts",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "Posts",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "Posts",
                keyColumn: "Id",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "Posts",
                keyColumn: "Id",
                keyValue: 8);

            migrationBuilder.DeleteData(
                table: "Posts",
                keyColumn: "Id",
                keyValue: 9);

            migrationBuilder.DeleteData(
                table: "Posts",
                keyColumn: "Id",
                keyValue: 10);

            migrationBuilder.DeleteData(
                table: "Tags",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Tags",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Tags",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Tags",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Tags",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "Tags",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "Tags",
                keyColumn: "Id",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "Tags",
                keyColumn: "Id",
                keyValue: 8);

            migrationBuilder.DeleteData(
                table: "Tags",
                keyColumn: "Id",
                keyValue: 9);

            migrationBuilder.DeleteData(
                table: "Tags",
                keyColumn: "Id",
                keyValue: 10);

            migrationBuilder.DeleteData(
                table: "Tags",
                keyColumn: "Id",
                keyValue: 11);

            migrationBuilder.DeleteData(
                table: "Tags",
                keyColumn: "Id",
                keyValue: 12);

            migrationBuilder.DeleteData(
                table: "Tags",
                keyColumn: "Id",
                keyValue: 13);

            migrationBuilder.DeleteData(
                table: "Tags",
                keyColumn: "Id",
                keyValue: 14);

            migrationBuilder.DeleteData(
                table: "Tags",
                keyColumn: "Id",
                keyValue: 15);

            migrationBuilder.DeleteData(
                table: "Tags",
                keyColumn: "Id",
                keyValue: 16);

            migrationBuilder.DeleteData(
                table: "Tags",
                keyColumn: "Id",
                keyValue: 17);

            migrationBuilder.DeleteData(
                table: "Tags",
                keyColumn: "Id",
                keyValue: 18);

            migrationBuilder.DeleteData(
                table: "Tags",
                keyColumn: "Id",
                keyValue: 19);

            migrationBuilder.DeleteData(
                table: "Tags",
                keyColumn: "Id",
                keyValue: 20);

            migrationBuilder.DeleteData(
                table: "Tags",
                keyColumn: "Id",
                keyValue: 21);

            migrationBuilder.DeleteData(
                table: "Tags",
                keyColumn: "Id",
                keyValue: 22);

            migrationBuilder.DeleteData(
                table: "Tags",
                keyColumn: "Id",
                keyValue: 23);

            migrationBuilder.DeleteData(
                table: "Tags",
                keyColumn: "Id",
                keyValue: 24);

            migrationBuilder.DeleteData(
                table: "Tags",
                keyColumn: "Id",
                keyValue: 25);

            migrationBuilder.DeleteData(
                table: "Tags",
                keyColumn: "Id",
                keyValue: 26);

            migrationBuilder.DeleteData(
                table: "Tags",
                keyColumn: "Id",
                keyValue: 27);

            migrationBuilder.DeleteData(
                table: "Tags",
                keyColumn: "Id",
                keyValue: 28);

            migrationBuilder.DeleteData(
                table: "Tags",
                keyColumn: "Id",
                keyValue: 29);

            migrationBuilder.DeleteData(
                table: "Tags",
                keyColumn: "Id",
                keyValue: 30);

            migrationBuilder.DeleteData(
                table: "Tags",
                keyColumn: "Id",
                keyValue: 31);

            migrationBuilder.DeleteData(
                table: "Tags",
                keyColumn: "Id",
                keyValue: 32);

            migrationBuilder.DeleteData(
                table: "Tags",
                keyColumn: "Id",
                keyValue: 33);

            migrationBuilder.DeleteData(
                table: "Tags",
                keyColumn: "Id",
                keyValue: 34);

            migrationBuilder.DeleteData(
                table: "Tags",
                keyColumn: "Id",
                keyValue: 35);

            migrationBuilder.DeleteData(
                table: "Tags",
                keyColumn: "Id",
                keyValue: 36);

            migrationBuilder.DeleteData(
                table: "Tags",
                keyColumn: "Id",
                keyValue: 37);

            migrationBuilder.DeleteData(
                table: "Tags",
                keyColumn: "Id",
                keyValue: 38);

            migrationBuilder.DeleteData(
                table: "Tags",
                keyColumn: "Id",
                keyValue: 39);

            migrationBuilder.DeleteData(
                table: "Tags",
                keyColumn: "Id",
                keyValue: 40);
        }
    }
}
