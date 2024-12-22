using System;
using static CitizenProposalApp.TagTypeId;

namespace CitizenProposalApp;

/// <summary>
/// Contains static properties of data seeds used to provide initial data to the entities used by this app.
/// </summary>
internal static class DataSeeds
{
    private static readonly DateTimeOffset placeholderTime = new(2024, 6, 9, 4, 2, 0, TimeSpan.Zero);
    public static object[] PostSeed { get; } = [
        new {
            Id = 1,
            Title = "加強國內農產品產銷資訊透明化",
            Content = "隨著全球氣候變遷，農產品供需波動日益劇烈，國內農業生產也受到影響，常常造成價格起伏不定，影響農民收益。建議農業部建立更加透明且即時的農產品產銷資訊平台，讓消費者和農民可以即時掌握市場供需狀況，達到價格穩定和市場均衡的目的。透過這樣的平台，農民可以根據市場資訊調整生產策略，而消費者也能更加理解價格變動的原因，減少市場誤解，進一步穩定農業經濟。",
            PostedTime = placeholderTime,
            AuthorId = 1
        },
        new {
            Id = 2,
            Title = "加強中小企業反壟斷保護措施",
            Content = "中小企業是國內經濟的重要支柱，但面臨大型企業壟斷的競爭壓力不斷增加。建議公平交易委員會進一步強化對於中小企業的保護，特別是在制定反壟斷法規和規範市場行為方面，提供更加透明的申訴管道和具體的罰則，保障中小企業在市場上的公平競爭環境，進一步促進經濟的多元化與可持續發展。",
            PostedTime = placeholderTime,
            AuthorId = 1
        },
        new {
            Id = 3,
            Title = "提高老年人福利及醫療資源",
            Content = "隨著人口老齡化趨勢日益加劇，老年人的醫療需求不斷上升。建議衛生福利部提供更多針對老年人的專屬醫療資源，特別是擴充護理機構及社區醫療網絡，並加強老年人健康管理的宣導。透過提高醫療資源的可及性，讓更多長者可以獲得良好的醫療照顧，減輕家庭照顧的壓力，提升全社會的福利水平。",
            PostedTime = placeholderTime,
            AuthorId = 1
        },
        new {
            Id = 4,
            Title = "建立交通事故減少措施",
            Content = "隨著交通量增加，交通事故的頻率和嚴重程度也有所提升，建議交通部實施一系列減少交通事故的措施，例如改善危險路段的道路設計，加強酒駕管制，並推廣道路安全教育，尤其是對青少年進行交通安全意識的培訓。透過這些措施，可以有效降低交通事故發生的風險，保護公共安全。",
            PostedTime = placeholderTime,
            AuthorId = 1
        },
        new {
            Id = 5,
            Title = "加強文化創意產業的支持政策",
            Content = "文化創意產業在推動經濟成長和提升國際影響力方面扮演重要角色。建議文化部擴充對文化創意產業的支持，例如提供更多資金補助、稅收優惠，並搭建國際平台，協助文創企業向國際市場拓展。通過這些措施，不僅能提高文化創意的產值，還可以提升國家的文化形象和軟實力。",
            PostedTime = placeholderTime,
            AuthorId = 1
        },
        new {
            Id = 6,
            Title = "建立國防科技人才培育體系",
            Content = "國防科技人才對於國防安全至關重要。建議國防部設立專門的科技人才培育計畫，特別是在人工智慧、網絡安全等領域，加強與國內外頂尖學府和科研機構的合作，吸引年輕人才投入國防科技的研發中。透過這種方式，能提升國防科技的自主性與創新能力，確保國家安全。",
            PostedTime = placeholderTime,
            AuthorId = 1
        },
        new {
            Id = 7,
            Title = "加速無障礙公共設施建設",
            Content = "為了提升全體公民的生活品質，建議內政部推動更多無障礙設施的建設，包括公共交通系統、公共建築和街道設施，以便於身障人士和老年人能夠安全方便地出行。透過建立更加無障礙的社會環境，可以實現更加平等和包容的社會。",
            PostedTime = placeholderTime,
            AuthorId = 1
        },
        new {
            Id = 8,
            Title = "促進環境友善農業",
            Content = "建議農業部推廣環境友善的農業技術，尤其是在農藥和肥料的使用上，應推動有機農業並提供相應的技術培訓和補助政策，以減少農業對環境的污染，維護生態平衡，並保障消費者的健康。",
            PostedTime = placeholderTime,
            AuthorId = 1
        },
        new {
            Id = 9,
            Title = "加強數位政務與資安防護",
            Content = "隨著數位化政務的推廣，資安問題變得越來越重要。建議國家通訊傳播委員會進一步提升數位政務系統的資安標準，並定期進行測試，確保市民個人資料的安全。同時，推動政府部門的資安知識培訓，提升資安意識，保障政府系統的穩定運行。",
            PostedTime = placeholderTime,
            AuthorId = 1
        },
        new {
            Id = 10,
            Title = "強化青少年心理健康支持體系",
            Content = "青少年面臨學業和生活壓力增加，心理健康問題日益嚴重。建議衛生福利部設立青少年心理健康支持專線和線上諮詢服務，並在學校內提供專業的心理健康教育，幫助青少年培養健康的心態和情緒管理能力，減少心理健康問題的發生。",
            PostedTime = placeholderTime,
            AuthorId = 1
        },

    ];
    public static object[] TagSeed { get; } = [
        new {
            Id = 1,
            Name = "農業資訊",
            TagTypeId = Topic
        },
        new {
            Id = 2,
            Name = "價格透明化",
            TagTypeId = Topic
        },
        new {
            Id = 3,
            Name = "農業政策",
            TagTypeId = Topic
        },
        new {
            Id = 4,
            Name = "交通部",
            TagTypeId = Department
        },
        new {
            Id = 5,
            Name = "中小企業",
            TagTypeId = Topic
        },
        new {
            Id = 6,
            Name = "反壟斷",
            TagTypeId = Topic
        },
        new {
            Id = 7,
            Name = "經濟多元化",
            TagTypeId = Topic
        },
        new {
            Id = 8,
            Name = "公平交易委員會",
            TagTypeId = Department
        },
        new {
            Id = 9,
            Name = "老年人福利",
            TagTypeId = Topic
        },
        new {
            Id = 10,
            Name = "醫療資源",
            TagTypeId = Topic
        },
        new {
            Id = 11,
            Name = "健康管理",
            TagTypeId = Topic
        },
        new {
            Id = 12,
            Name = "衛生福利部",
            TagTypeId = Department
        },
        new {
            Id = 13,
            Name = "交通安全",
            TagTypeId = Topic
        },
        new {
            Id = 14,
            Name = "酒駕防治",
            TagTypeId = Topic
        },
        new {
            Id = 15,
            Name = "公共安全",
            TagTypeId = Topic
        },
        new {
            Id = 16,
            Name = "行政院主計總處",
            TagTypeId = Department
        },
        new {
            Id = 17,
            Name = "文化創意",
            TagTypeId = Topic
        },
        new {
            Id = 18,
            Name = "經濟成長",
            TagTypeId = Topic
        },
        new {
            Id = 19,
            Name = "國際市場",
            TagTypeId = Topic
        },
        new {
            Id = 20,
            Name = "文化部",
            TagTypeId = Department
        },
        new {
            Id = 21,
            Name = "國防科技",
            TagTypeId = Topic
        },
        new {
            Id = 22,
            Name = "人才培育",
            TagTypeId = Topic
        },
        new {
            Id = 23,
            Name = "人工智慧",
            TagTypeId = Topic
        },
        new {
            Id = 24,
            Name = "國防部",
            TagTypeId = Department
        },
        new {
            Id = 25,
            Name = "無障礙設施",
            TagTypeId = Topic
        },
        new {
            Id = 26,
            Name = "公共建設",
            TagTypeId = Topic
        },
        new {
            Id = 27,
            Name = "包容性社會",
            TagTypeId = Topic
        },
        new {
            Id = 28,
            Name = "內政部",
            TagTypeId = Department
        },
        new {
            Id = 29,
            Name = "環境友善農業",
            TagTypeId = Topic
        },
        new {
            Id = 30,
            Name = "生態平衡",
            TagTypeId = Topic
        },
        new {
            Id = 31,
            Name = "農業技術",
            TagTypeId = Topic
        },
        new {
            Id = 32,
            Name = "農業部",
            TagTypeId = Department
        },
        new {
            Id = 33,
            Name = "數位政務",
            TagTypeId = Topic
        },
        new {
            Id = 34,
            Name = "資安防護",
            TagTypeId = Topic
        },
        new {
            Id = 35,
            Name = "個人資料保護",
            TagTypeId = Topic
        },
        new {
            Id = 36,
            Name = "國家通訊傳播委員會",
            TagTypeId = Department
        },
        new {
            Id = 37,
            Name = "青少年心理健康",
            TagTypeId = Topic
        },
        new {
            Id = 38,
            Name = "心理支持",
            TagTypeId = Topic
        },
        new {
            Id = 39,
            Name = "教育推廣",
            TagTypeId = Topic
        },
        new {
            Id = 40,
            Name = "教育部",
            TagTypeId = Department
        },
        new {
            Id = 41,
            Name = "中央選舉委員會",
            TagTypeId = Department
        },
        new {
            Id = 42,
            Name = "僑務委員會",
            TagTypeId = Department
        },
        new {
            Id = 43,
            Name = "勞動部",
            TagTypeId = Department
        },
        new {
            Id = 44,
            Name = "國軍退除役官兵輔導委員會",
            TagTypeId = Department
        },
        new {
            Id = 45,
            Name = "外交部",
            TagTypeId = Department
        },
        new {
            Id = 46,
            Name = "客家委員會",
            TagTypeId = Department
        },
        new {
            Id = 47,
            Name = "法務部",
            TagTypeId = Department
        },
        new {
            Id = 48,
            Name = "環境部",
            TagTypeId = Department
        },
        new {
            Id = 49,
            Name = "經濟部",
            TagTypeId = Department
        },
        new {
            Id = 50,
            Name = "行政院人事行政總處",
            TagTypeId = Department
        },
        new {
            Id = 51,
            Name = "財政部",
            TagTypeId = Department
        },
        new {
            Id = 52,
            Name = "金融監督管理委員會",
            TagTypeId = Department
        }
    ];

    /// <summary>
    /// Used to seed the many-to-many relationship between <see cref="Post"/> and <see cref="Tag"/>.
    /// </summary>
    public static object[] PostTagSeed { get; } = [
        new {
            PostsId = 1,
            TagsId = 1
        },
        new {
            PostsId = 1,
            TagsId = 2
        },
        new {
            PostsId = 1,
            TagsId = 3
        },
        new {
            PostsId = 1,
            TagsId = 4
        },
        new {
            PostsId = 2,
            TagsId = 5
        },
        new {
            PostsId = 2,
            TagsId = 6
        },
        new {
            PostsId = 2,
            TagsId = 7
        },
        new {
            PostsId = 2,
            TagsId = 8
        },
        new {
            PostsId = 3,
            TagsId = 9
        },
        new {
            PostsId = 3,
            TagsId = 10
        },
        new {
            PostsId = 3,
            TagsId = 11
        },
        new {
            PostsId = 3,
            TagsId = 12
        },
        new {
            PostsId = 4,
            TagsId = 13
        },
        new {
            PostsId = 4,
            TagsId = 14
        },
        new {
            PostsId = 4,
            TagsId = 15
        },
        new {
            PostsId = 4,
            TagsId = 16
        },
        new {
            PostsId = 5,
            TagsId = 17
        },
        new {
            PostsId = 5,
            TagsId = 18
        },
        new {
            PostsId = 5,
            TagsId = 19
        },
        new {
            PostsId = 5,
            TagsId = 20
        },
        new {
            PostsId = 6,
            TagsId = 21
        },
        new {
            PostsId = 6,
            TagsId = 22
        },
        new {
            PostsId = 6,
            TagsId = 23
        },
        new {
            PostsId = 6,
            TagsId = 24
        },
        new {
            PostsId = 7,
            TagsId = 25
        },
        new {
            PostsId = 7,
            TagsId = 26
        },
        new {
            PostsId = 7,
            TagsId = 27
        },
        new {
            PostsId = 7,
            TagsId = 28
        },
        new {
            PostsId = 8,
            TagsId = 29
        },
        new {
            PostsId = 8,
            TagsId = 30
        },
        new {
            PostsId = 8,
            TagsId = 31
        },
        new {
            PostsId = 8,
            TagsId = 32
        },
        new {
            PostsId = 9,
            TagsId = 33
        },
        new {
            PostsId = 9,
            TagsId = 34
        },
        new {
            PostsId = 9,
            TagsId = 35
        },
        new {
            PostsId = 9,
            TagsId = 36
        },
        new {
            PostsId = 10,
            TagsId = 37
        },
        new {
            PostsId = 10,
            TagsId = 38
        },
        new {
            PostsId = 10,
            TagsId = 39
        },
        new {
            PostsId = 10,
            TagsId = 40
        }
    ];

    public static object[] UserSeed = [
        new {
            Id = 1,
            Username = "DemoUser",
            DegreeOfParallelism = 0,
            MemorySizeKib = 0,
            IterationCount = 0,
            Salt = Array.Empty<byte>(),
            PasswordHash = Array.Empty<byte>(),
            Loginable = false
        }
    ];
}
