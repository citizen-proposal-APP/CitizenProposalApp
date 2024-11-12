using System;

namespace CitizenProposalApp;

/// <summary>
/// Contains static properties of data seeds used to provide initial data to the entities used by this app.
/// </summary>
internal static class DataSeeds
{
    private static readonly DateTime placeholderTime = new(2024, 6, 9, 4, 2, 0);
    public static object[] PostSeed { get; } = [
        new {
            Id = 1,
            Title = "�[�j�ꤺ�A���~���P��T�z����",
            Content = "�H�ۥ��y����ܾE�A�A���~�ѻݪi�ʤ�q�@�P�A�ꤺ�A�~�Ͳ��]����v�T�A�`�`�y������_�񤣩w�A�v�T�A�����q�C��ĳ�A�~���إߧ�[�z���B�Y�ɪ��A���~���P��T���x�A�����O�̩M�A���i�H�Y�ɴx�������ѻݪ��p�A�F�����í�w�M�������Ū��ت��C�z�L�o�˪����x�A�A���i�H�ھڥ�����T�վ�Ͳ������A�Ӯ��O�̤]���[�z�ѻ����ܰʪ���]�A��֥����~�ѡA�i�@�Bí�w�A�~�g�١C",
            PostedTime = placeholderTime
        },
        new {
            Id = 2,
            Title = "�[�j���p���~���b�_�O�@���I",
            Content = "���p���~�O�ꤺ�g�٪����n��W�A�����{�j�����~�b�_���v�����O���_�W�[�C��ĳ��������e���|�i�@�B�j�ƹ�󤤤p���~���O�@�A�S�O�O�b��w���b�_�k�W�M�W�d�����欰�譱�A���ѧ�[�z�����ӶD�޹D�M���骺�@�h�A�O�٤��p���~�b�����W�������v�����ҡA�i�@�B�P�i�g�٪��h���ƻP�i����o�i�C",
            PostedTime = placeholderTime
        },
        new {
            Id = 3,
            Title = "�����Ѧ~�H�֧Q�������귽",
            Content = "�H�ۤH�f���֤��Ͷդ�q�[�@�A�Ѧ~�H�������ݨD���_�W�ɡC��ĳ�åͺ֧Q�����ѧ�h�w��Ѧ~�H���M�������귽�A�S�O�O�X�R�@�z���c�Ϊ������������A�å[�j�Ѧ~�H���d�޲z���žɡC�z�L���������귽���i�ΩʡA����h���̥i�H��o�}�n���������U�A��a�x���U�����O�A���ɥ����|���֧Q�����C",
            PostedTime = placeholderTime
        },
        new {
            Id = 4,
            Title = "�إߥ�q�ƬG��ֱ��I",
            Content = "�H�ۥ�q�q�W�[�A��q�ƬG���W�v�M�Y���{�פ]���Ҵ��ɡA��ĳ��q����I�@�t�C��֥�q�ƬG�����I�A�Ҧp�ﵽ�M�I���q���D���]�p�A�[�j�s�r�ި�A�ñ��s�D���w���Ш|�A�ר�O��C�֦~�i���q�w���N�Ѫ����V�C�z�L�o�Ǳ��I�A�i�H���ĭ��C��q�ƬG�o�ͪ����I�A�O�@���@�w���C",
            PostedTime = placeholderTime
        },
        new {
            Id = 5,
            Title = "�[�j��ƳзN���~������F��",
            Content = "��ƳзN���~�b���ʸg�٦����M���ɰ�ڼv�T�O�譱��t���n����C��ĳ��Ƴ��X�R���ƳзN���~������A�Ҧp���ѧ�h����ɧU�B�|���u�f�A�÷f�ذ�ڥ��x�A��U��Х��~�V��ڥ����ݮi�C�q�L�o�Ǳ��I�A���ȯണ����ƳзN�����ȡA�٥i�H���ɰ�a����ƧζH�M�n��O�C",
            PostedTime = placeholderTime
        },
        new {
            Id = 6,
            Title = "�إ߰꨾��ޤH�~���|��t",
            Content = "�꨾��ޤH�~���꨾�w���������n�C��ĳ�꨾���]�߱M������ޤH�~���|�p�e�A�S�O�O�b�H�u���z�B�����w�������A�[�j�P�ꤺ�~���y�ǩ��M�����c���X�@�A�l�ަ~���H�~��J�꨾��ު���o���C�z�L�o�ؤ覡�A�ണ�ɰ꨾��ު��ۥD�ʻP�зs��O�A�T�O��a�w���C",
            PostedTime = placeholderTime
        },
        new {
            Id = 7,
            Title = "�[�t�L��ê���@�]�I�س]",
            Content = "���F���ɥ��餽�����ͬ��~��A��ĳ���F�����ʧ�h�L��ê�]�I���س]�A�]�A���@��q�t�ΡB���@�ؿv�M��D�]�I�A�H�K�󨭻٤H�h�M�Ѧ~�H����w����K�a�X��C�z�L�إߧ�[�L��ê�����|���ҡA�i�H��{��[�����M�]�e�����|�C",
            PostedTime = placeholderTime
        },
        new {
            Id = 8,
            Title = "�P�i���Ҥ͵��A�~",
            Content = "��ĳ�A�~�����s���Ҥ͵����A�~�޳N�A�ר�O�b�A�ĩM�ήƪ��ϥΤW�A�����ʦ����A�~�ô��Ѭ������޳N���V�M�ɧU�F���A�H��ֹA�~�����Ҫ��ìV�A���@�ͺA���šA�ëO�ٮ��O�̪����d�C",
            PostedTime = placeholderTime
        },
        new {
            Id = 9,
            Title = "�[�j�Ʀ�F�ȻP��w���@",
            Content = "�H�ۼƦ�ƬF�Ȫ����s�A��w���D�ܱo�V�ӶV���n�C��ĳ��a�q�T�Ǽ��e���|�i�@�B���ɼƦ�F�Ȩt�Ϊ���w�зǡA�éw���i����աA�T�O�����ӤH��ƪ��w���C�P�ɡA���ʬF����������w���Ѱ��V�A���ɸ�w�N�ѡA�O�٬F���t�Ϊ�í�w�B��C",
            PostedTime = placeholderTime
        },
        new {
            Id = 10,
            Title = "�j�ƫC�֦~�߲z���d�����t",
            Content = "�C�֦~���{�Ƿ~�M�ͬ����O�W�[�A�߲z���d���D��q�Y���C��ĳ�åͺ֧Q���]�߫C�֦~�߲z���d����M�u�M�u�W�ԸߪA�ȡA�æb�Ǯդ����ѱM�~���߲z���d�Ш|�A���U�C�֦~���i���d���ߺA�M�����޲z��O�A��֤߲z���d���D���o�͡C",
            PostedTime = placeholderTime
        },

    ];
    public static object[] TagSeed { get; } = [
        new {
            Id = 1,
            Name = "�A�~��T"
        },
        new {
            Id = 2,
            Name = "����z����"
        },
        new {
            Id = 3,
            Name = "�A�~�F��"
        },
        new {
            Id = 4,
            Name = "��q��"
        },
        new {
            Id = 5,
            Name = "���p���~"
        },
        new {
            Id = 6,
            Name = "���b�_"
        },
        new {
            Id = 7,
            Name = "�g�٦h����"
        },
        new {
            Id = 8,
            Name = "��������e���|"
        },
        new {
            Id = 9,
            Name = "�Ѧ~�H�֧Q"
        },
        new {
            Id = 10,
            Name = "�����귽"
        },
        new {
            Id = 11,
            Name = "���d�޲z"
        },
        new {
            Id = 12,
            Name = "�åͺ֧Q��"
        },
        new {
            Id = 13,
            Name = "��q�w��"
        },
        new {
            Id = 14,
            Name = "�s�r���v"
        },
        new {
            Id = 15,
            Name = "���@�w��"
        },
        new {
            Id = 16,
            Name = "��F�|�D�p�`�B"
        },
        new {
            Id = 17,
            Name = "��ƳзN"
        },
        new {
            Id = 18,
            Name = "�g�٦���"
        },
        new {
            Id = 19,
            Name = "��ڥ���"
        },
        new {
            Id = 20,
            Name = "��Ƴ�"
        },
        new {
            Id = 21,
            Name = "�꨾���"
        },
        new {
            Id = 22,
            Name = "�H�~���|"
        },
        new {
            Id = 23,
            Name = "�H�u���z"
        },
        new {
            Id = 24,
            Name = "�꨾��"
        },
        new {
            Id = 25,
            Name = "�L��ê�]�I"
        },
        new {
            Id = 26,
            Name = "���@�س]"
        },
        new {
            Id = 27,
            Name = "�]�e�ʪ��|"
        },
        new {
            Id = 28,
            Name = "���F��"
        },
        new {
            Id = 29,
            Name = "���Ҥ͵��A�~"
        },
        new {
            Id = 30,
            Name = "�ͺA����"
        },
        new {
            Id = 31,
            Name = "�A�~�޳N"
        },
        new {
            Id = 32,
            Name = "�A�~��"
        },
        new {
            Id = 33,
            Name = "�Ʀ�F��"
        },
        new {
            Id = 34,
            Name = "��w���@"
        },
        new {
            Id = 35,
            Name = "�ӤH��ƫO�@"
        },
        new {
            Id = 36,
            Name = "��a�q�T�Ǽ��e���|"
        },
        new {
            Id = 37,
            Name = "�C�֦~�߲z���d"
        },
        new {
            Id = 38,
            Name = "�߲z���"
        },
        new {
            Id = 39,
            Name = "�Ш|���s"
        },
        new {
            Id = 40,
            Name = "�Ш|��"
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
}