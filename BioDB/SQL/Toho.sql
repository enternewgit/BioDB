drop database if exists Toho; #先にdemoと言う名前のデータベースがあったら削除する
create database Toho; #demoという名前のデータベースを作成する

use Toho; #demoデータベースを使用する

#テーブルを作成する
create table Music(
    ID int not null auto_increment,
    Name char(60) not null,
    genreID int not null,
    Enemy_Name char(30),
    stage int,
	Musicurl text,
    primary key(ID));



create table Genre(
    genreID int not null auto_increment,
    genre char(4) not null,
    url text,
    primary key(genreID)
);

create table Tohomusic(
    ID int not null,
    genreID int not null,
    primary key(ID, genreID));




-- データを Music テーブルに挿入
INSERT INTO Music (ID, Name, genreID, Enemy_Name, stage, Musicurl) VALUES
(1, '赤より紅い夢', 1, NULL, 0,null),
(2, '妖魔夜行', 1, 'ルーミア', 1,null),
(3, 'おてんば恋娘', 1, 'チルノ', 2,null),
(4, '明治十七年の上海アリス', 1, '紅美鈴', 3,'https://www.youtube.com/watch?v=8d2N-VoE0F4'),
(5, 'U.N.オーエンは彼女なのか？', 1, 'フランドール・スカーレット', 7,'https://www.youtube.com/watch?v=ssdcX1vVBTo'),
(6, '広有射怪鳥事', 2, '魂魄妖夢', 5,null),
(7, '幽雅に咲かせ、黒染の桜', 2, '西行寺幽々子', 6,null),
(8, '妖々跋扈', 2, '八雲藍', 7,null),
(9, 'ブレインエイジア', 3, '上白沢慧音', 3,null),
(10, '恋色マスタースパーク', 3, '霧雨魔理沙', 4,null),
(11, '千年幻想郷', 3, '八意永琳', 6,null),
(12, '月まで届け、不死の煙', 3, '藤原妹紅', 7,null),
(13, '稲田姫様に叱られるから', 4, '秋穣子', 1,null),
(14, '運命のダークサイド', 4, '鍵山雛', 2,null),
(15, '妖怪の山', 4, '射命丸文', 4,null),
(16, 'ネイティブフェイス', 4, '洩矢諏訪子', 7,null),
(17, '地霊達の起床', 5, NULL, 0,null),
(18, '死体旅行', 5, '火焔猫燐', 5,null),
(19, '霊知の太陽信仰', 5, '霊烏路空', 6,NULL);

-- データを Genre テーブルに挿入
INSERT INTO Genre (genreID, genre, url) VALUES
(1, '紅魔郷', 'https://www.amazon.co.jp/東方紅魔郷～the-Embodiment-of-Scarlet-Devil～/dp/B093ST7PSM'),
(2, '妖々夢', 'https://www.amazon.co.jp/少女弾幕奇譚-東方妖々夢-Perfect-Cherry-Blossom/dp/B093SVDXZZ'),
(3, '永夜抄', 'https://www.amazon.co.jp/東方プロジェクト-東方永夜抄-～Imperishable-Night/dp/B093SSK34P'),
(4, '風神録', 'https://www.amazon.co.jp/東方プロジェクト-東方風神録～Mountain-of-Faith/dp/B093SSRLD5'),
(5, '地霊殿', 'https://www.amazon.co.jp/東方プロジェクト-東方地霊殿～Subterranean-Animism/dp/B093SS9GGF');

-- データを Tohomusic テーブルに挿入
INSERT INTO Tohomusic (ID, genreID) VALUES
(1, 1),
(2, 1),
(3, 1),
(4, 1),
(5, 1),
(6, 2),
(7, 2),
(8, 2),
(9, 3),
(10, 3),
(11, 3),
(12, 3),
(13, 4),
(14, 4),
(15, 4),
(16, 4),
(17, 5),
(18, 5),
(19, 5);