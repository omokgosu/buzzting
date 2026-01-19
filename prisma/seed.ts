require("dotenv").config();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const employees = [
  { nickname: "Young", email: "youngholee@buzzvil.com" },
  { nickname: "John", email: "john.lee@buzzvil.com" },
  { nickname: "Zune", email: "zuneseo@buzzvil.com" },
  { nickname: "Max", email: "max@buzzvil.com" },
  { nickname: "Steve", email: "steve.jang@buzzvil.com" },
  { nickname: "Bling", email: "bling.kim@buzzvil.com" },
  { nickname: "Brice", email: "brice.bang@buzzvil.com" },
  { nickname: "Jetty", email: "jetty.cho@buzzvil.com" },
  { nickname: "Jerry", email: "jerry.ko@buzzvil.com" },
  { nickname: "Dio", email: "dio.heo@buzzvil.com" },
  { nickname: "Bruce", email: "bruce.kim@buzzvil.com" },
  { nickname: "Kai", email: "kai.lee@buzzvil.com" },
  { nickname: "Ed", email: "ed.kang@buzzvil.com" },
  { nickname: "Clair", email: "clair.baek@buzzvil.com" },
  { nickname: "Lucy", email: "lucy.yoo@buzzvil.com" },
  { nickname: "Justin", email: "justin.jeong@buzzvil.com" },
  { nickname: "Gloria", email: "gloria.lee@buzzvil.com" },
  { nickname: "Benjamin", email: "benjamin.lee@buzzvil.com" },
  { nickname: "Daisy", email: "daisy.kim@buzzvil.com" },
  { nickname: "Olivia", email: "olivia.kim@buzzvil.com" },
  { nickname: "Daniel", email: "daniel.song@buzzvil.com" },
  { nickname: "Nike", email: "nike.moon@buzzvil.com" },
  { nickname: "Thomas", email: "thomas.kim@buzzvil.com" },
  { nickname: "Bella", email: "bella.oh@buzzvil.com" },
  { nickname: "Bernard", email: "bernard.choi@buzzvil.com" },
  { nickname: "Cordelia", email: "cordelia.chang@buzzvil.com" },
  { nickname: "Jackie", email: "jackie.park@buzzvil.com" },
  { nickname: "Jules", email: "jules.yim@buzzvil.com" },
  { nickname: "Dane", email: "dane.kim@buzzvil.com" },
  { nickname: "BK", email: "bk.kang@buzzvil.com" },
  { nickname: "Roha", email: "roha.lee@buzzvil.com" },
  { nickname: "Berry", email: "berry.kim@buzzvil.com" },
  { nickname: "Phil", email: "phil.yoo@buzzvil.com" },
  { nickname: "Cindy", email: "cindy.choi@buzzvil.com" },
  { nickname: "Elle", email: "elle.shin@buzzvil.com" },
  { nickname: "Jua", email: "jua.song@buzzvil.com" },
  { nickname: "Mason", email: "mason.yun@buzzvil.com" },
  { nickname: "Jia", email: "jia.cui@buzzvil.com" },
  { nickname: "Ron", email: "ron.son@buzzvil.com" },
  { nickname: "Toy", email: "toy.yu@buzzvil.com" },
  { nickname: "Marvin", email: "marvin.hong@buzzvil.com" },
  { nickname: "Silva", email: "silva.yun@buzzvil.com" },
  { nickname: "Scott", email: "scott.choe@buzzvil.com" },
  { nickname: "Dean", email: "dean.choi@buzzvil.com" },
  { nickname: "Logan", email: "logan.kim@buzzvil.com" },
  { nickname: "Theo", email: "theo.park@buzzvil.com" },
  { nickname: "Luis", email: "luis.hong@buzzvil.com" },
  { nickname: "Henry", email: "henry.yoon@buzzvil.com" },
  { nickname: "Ella", email: "ella.yoo@buzzvil.com" },
  { nickname: "Kun", email: "kun.kim@buzzvil.com" },
  { nickname: "Freeman", email: "freeman.lee@buzzvil.com" },
  { nickname: "Hazel", email: "hazel.jang@buzzvil.com" },
  { nickname: "Crow", email: "crow.yang@buzzvil.com" },
  { nickname: "Koby", email: "koby.jo@buzzvil.com" },
  { nickname: "Judy", email: "judy.park@buzzvil.com" },
  { nickname: "Jake", email: "jake.moon@buzzvil.com" },
  { nickname: "Derrick", email: "derrick.jung@buzzvil.com" },
  { nickname: "Breeze", email: "breeze.song@buzzvil.com" },
  { nickname: "Van", email: "van.kim@buzzvil.com" },
  { nickname: "Chloe", email: "chloe.kim@buzzvil.com" },
  { nickname: "Wynn", email: "wynn.huh@buzzvil.com" },
  { nickname: "Ivan", email: "ivan.chung@buzzvil.com" },
  { nickname: "Sasha", email: "sasha.lee@buzzvil.com" },
  { nickname: "Jay", email: "jay.jeong@buzzvil.com" },
  { nickname: "Carl", email: "carl.cho@buzzvil.com" },
  { nickname: "Shannon", email: "shannon.kim@buzzvil.com" },
  { nickname: "Lucas", email: "lucas.gong@buzzvil.com" },
  { nickname: "Mella", email: "mella.min@buzzvil.com" },
  { nickname: "Nonan", email: "nonan.noh@buzzvil.com" },
  { nickname: "Woody", email: "woody.jung@buzzvil.com" },
  { nickname: "Glenn", email: "glenn.kim@buzzvil.com" },
  { nickname: "Green", email: "green.kang@buzzvil.com" },
  { nickname: "Weasley", email: "weasley.nam@buzzvil.com" },
  { nickname: "Frank", email: "frank.koh@buzzvil.com" },
  { nickname: "Elric", email: "elric.lim@buzzvil.com" },
  { nickname: "Luca", email: "luca.jung@buzzvil.com" },
  { nickname: "Lumi", email: "lumi.seo@buzzvil.com" },
  { nickname: "Nathan", email: "nathan.seo@buzzvil.com" },
  { nickname: "Edan", email: "edan.han@buzzvil.com" },
  { nickname: "Silas", email: "silas.cho@buzzvil.com" },
  { nickname: "Dorothy", email: "dorothy.yu@buzzvil.com" },
  { nickname: "Patrick", email: "patrick.park@buzzvil.com" },
  { nickname: "Wade", email: "wade.kim@buzzvil.com" },
  { nickname: "Miles", email: "miles.lee@buzzvil.com" },
  { nickname: "Watt", email: "watt.choi@buzzvil.com" },
  { nickname: "Joy", email: "joy.bae@buzzvil.com" },
  { nickname: "Silo", email: "silo.park@buzzvil.com" },
  { nickname: "Caisy", email: "caisy.son@buzzvil.com" },
  { nickname: "Edward", email: "edward.jang@buzzvil.com" },
  { nickname: "Chris", email: "chris.jung@buzzvil.com" },
  { nickname: "Jed", email: "jed.jeon@buzzvil.com" },
  { nickname: "Jeff", email: "jeff.cho@buzzvil.com" },
  { nickname: "Zen", email: "zen.kim@buzzvil.com" },
  { nickname: "Philip", email: "philip.kwun@buzzvil.com" },
  { nickname: "Allan", email: "allan.kim@buzzvil.com" },
  { nickname: "Menny", email: "menny.sim@buzzvil.com" },
  { nickname: "Jasmine", email: "jasmine.kim@buzzvil.com" },
  { nickname: "Ellie", email: "ellie.lee@buzzvil.com" },
  { nickname: "Thor", email: "thor.son@buzzvil.com" },
  { nickname: "Rina", email: "rina.lee@buzzvil.com" },
  { nickname: "Stella", email: "stella.song@buzzvil.com" },
  { nickname: "Karis", email: "karis.song@buzzvil.com" },
  { nickname: "David", email: "david.jin@buzzvil.com" },
  { nickname: "Yenny", email: "yenny.kim@buzzvil.com" },
  { nickname: "Eric", email: "eric.noh@buzzvil.com" },
  { nickname: "Wendy", email: "wendy.seo@buzzvil.com" },
  { nickname: "Brandon", email: "brandon.jang@buzzvil.com" },
  { nickname: "Aegon", email: "aegon.jang@buzzvil.com" },
  { nickname: "Isla", email: "isla.oh@buzzvil.com" },
  { nickname: "Hazard", email: "hazard.ham@buzzvil.com" },
  { nickname: "Lowen", email: "lowen.go@buzzvil.com" },
  { nickname: "Eden", email: "eden.ryu@buzzvil.com" },
  { nickname: "Silver", email: "silver.hong@buzzvil.com" },
  { nickname: "River", email: "river.kim@buzzvil.com" },
  { nickname: "Vale", email: "vale.kim@buzzvil.com" },
  { nickname: "Reina", email: "reina.jeong@buzzvil.com" },
  { nickname: "Steven", email: "steven.yang@buzzvil.com" },
  { nickname: "Romy", email: "romy.kim@buzzvil.com" },
  { nickname: "Ocean", email: "ocean.yang@buzzvil.com" },
  { nickname: "Ben", email: "ben.baek@buzzvil.com" },
  { nickname: "Liam", email: "liam.lee@buzzvil.com" },
  { nickname: "Jarrod", email: "jarrod.lee@buzzvil.com" },
  { nickname: "Alex", email: "alex.chung@buzzvil.com" },
  { nickname: "Gianna", email: "gianna.shim@buzzvil.com" },
  { nickname: "Liana", email: "liana.kim@buzzvil.com" },
  { nickname: "Zenith", email: "zenith.kim@buzzvil.com" },
];

// 테스트 유저
const testUsers = [
  { nickname: "Test1", email: "test1@buzzvil.com" },
  { nickname: "Test2", email: "test2@buzzvil.com" },
];

// 테스트 프로필 데이터
const testProfiles = [
  {
    userEmail: "test1@buzzvil.com",
    registeredByEmail: "test2@buzzvil.com",
    data: {
      nickname: "밝은햇살",
      character: "fox",
      birthYear: 1995,
      bio: "안녕하세요! 제 친구를 소개합니다.\n\n성격이 정말 밝고 긍정적인 친구예요. 누구랑 있어도 분위기를 즐겁게 만들어주는 매력이 있어요. 일도 열심히 하고, 주말에는 다양한 취미활동을 즐기는 활동적인 타입입니다.\n\n연애할 때는 상대방을 잘 챙겨주고 배려심이 깊어요. 한번 마음 주면 진심으로 대하는 스타일이라 좋은 인연 만났으면 좋겠네요!",
      height: 172,
      mbti: "ENFP",
      location: "서울 강남",
      job: "IT 스타트업",
      smoking: "비흡연",
      drinking: "월 1-2회",
      interests: ["운동/헬스", "여행", "카페/맛집", "영화/드라마"],
      idealTypes: ["대화가 잘 통하는 사람", "웃음코드가 맞는 사람", "배려심 깊고 따뜻한 사람"],
      dateStyles: ["여유로운 카페산책 (동네 카페/공원 산책)", "맛집탐방 (새로운 음식/술 한잔)"],
      datingStyles: ["천천히 알아가는 타입"],
      contactStyles: ["카톡 빠른 답장파"],
      contactPreference: "카카오톡",
    },
  },
  {
    userEmail: "test2@buzzvil.com",
    registeredByEmail: "test1@buzzvil.com",
    data: {
      nickname: "달빛소년",
      character: "bear",
      birthYear: 1993,
      bio: "제 친구 소개해요~\n\n차분하고 듬직한 스타일이에요. 말수가 적은 편이지만 속은 정말 따뜻해요. 한번 친해지면 정말 잘 챙겨주는 타입이라 주변에 친구들도 많아요.\n\n취미로 기타를 치고 있고, 주말에는 카페에서 책 읽는 걸 좋아해요. 조용한 데이트를 선호하지만 가끔은 활동적인 것도 좋아합니다!",
      height: 180,
      mbti: "ISFJ",
      location: "서울 마포",
      job: "대기업 개발자",
      smoking: "비흡연",
      drinking: "주 1-2회",
      interests: ["음악/악기", "독서/웹소설", "카페/맛집", "반려동물"],
      idealTypes: ["내향적이고 잔잔한 사람", "배려심 깊고 따뜻한 사람"],
      dateStyles: ["편안한 실내데이트 (집/영화/보드게임)", "문화생활 즐기기 (전시회/공연/영화관람)"],
      datingStyles: ["천천히 알아가는 타입", "리드하는 편"],
      contactStyles: ["답장 느리지만 꾸준파"],
      contactPreference: "카카오톡",
    },
  },
  // Test1이 등록한 프로필들
  {
    userEmail: "test1@buzzvil.com",
    registeredByEmail: "test1@buzzvil.com",
    data: {
      nickname: "웃음꽃",
      character: "rabbit",
      birthYear: 1997,
      bio: "제 동생같은 친구를 소개해요!\n\n정말 순수하고 착한 친구예요. 웃을 때 눈이 초승달처럼 되는게 너무 귀여워요. 사람들한테 먼저 다가가는 스타일은 아니지만, 한번 친해지면 정말 잘 챙겨주는 타입이에요.\n\n요리를 정말 잘해서 집들이 할 때마다 음식 담당이에요. 좋은 사람 만나서 맛있는 거 해주면서 행복하게 살았으면 좋겠어요!",
      height: 165,
      mbti: "INFP",
      location: "서울 성수",
      job: "디자이너",
      smoking: "비흡연",
      drinking: "거의 안함",
      interests: ["요리/베이킹", "그림/일러스트", "카페/맛집", "반려동물"],
      idealTypes: ["다정하고 따뜻한 사람", "유머러스한 사람", "자기 일에 열정 있는 사람"],
      dateStyles: ["편안한 실내데이트 (집/영화/보드게임)", "여유로운 카페산책 (동네 카페/공원 산책)"],
      datingStyles: ["천천히 알아가는 타입", "리드받는 편"],
      contactStyles: ["답장 느리지만 꾸준파"],
      contactPreference: "카카오톡",
    },
  },
  {
    userEmail: "test1@buzzvil.com",
    registeredByEmail: "test1@buzzvil.com",
    data: {
      nickname: "바다소리",
      character: "cat",
      birthYear: 1994,
      bio: "대학 동기 소개합니다~\n\n겉으로는 시크해 보이는데 알고 보면 엄청 다정해요. 고양이상이라 첫인상이 차가워 보일 수 있는데 친해지면 완전 반전매력이에요.\n\n일 욕심이 있어서 커리어우먼 스타일이고, 자기 시간도 중요하게 생각해요. 서로 존중하면서 각자의 삶도 응원해줄 수 있는 관계를 원해요!",
      height: 168,
      mbti: "INTJ",
      location: "서울 잠실",
      job: "마케터",
      smoking: "비흡연",
      drinking: "월 1-2회",
      interests: ["영화/드라마", "독서/웹소설", "와인/위스키", "여행"],
      idealTypes: ["지적인 대화가 가능한 사람", "자기 일에 열정 있는 사람", "독립적인 사람"],
      dateStyles: ["문화생활 즐기기 (전시회/공연/영화관람)", "맛집탐방 (새로운 음식/술 한잔)"],
      datingStyles: ["밀당보다 솔직한 편", "리드하는 편"],
      contactStyles: ["할 말 있을 때만 연락파"],
      contactPreference: "카카오톡",
    },
  },
  {
    userEmail: "test1@buzzvil.com",
    registeredByEmail: "test1@buzzvil.com",
    data: {
      nickname: "별빛",
      character: "penguin",
      birthYear: 1996,
      bio: "회사 동료인데 진짜 좋은 친구예요!\n\n성실하고 책임감 강한 타입이에요. 약속 시간 칼같이 지키고, 한번 한 약속은 꼭 지키려고 해요. 사소한 것도 기억했다가 챙겨주는 섬세한 면이 있어요.\n\n주말마다 등산이나 러닝하는 건강한 라이프스타일이에요. 같이 건강하게 운동하면서 힐링할 수 있는 사람이면 좋겠대요!",
      height: 175,
      mbti: "ESTJ",
      location: "서울 역삼",
      job: "금융권",
      smoking: "비흡연",
      drinking: "주 1-2회",
      interests: ["운동/헬스", "등산/러닝", "여행", "카페/맛집"],
      idealTypes: ["건강한 라이프스타일", "긍정적인 마인드", "대화가 잘 통하는 사람"],
      dateStyles: ["액티브한 야외데이트 (러닝/등산/피크닉)", "여유로운 카페산책 (동네 카페/공원 산책)"],
      datingStyles: ["밀당보다 솔직한 편", "리드하는 편"],
      contactStyles: ["카톡 빠른 답장파"],
      contactPreference: "전화번호",
    },
  },
  // Test2가 등록한 프로필들
  {
    userEmail: "test2@buzzvil.com",
    registeredByEmail: "test2@buzzvil.com",
    data: {
      nickname: "구름이",
      character: "dog",
      birthYear: 1998,
      bio: "제 절친을 소개합니다!\n\n강아지상으로 정말 귀엽고 사람 좋아하는 친구예요. 처음 보는 사람한테도 스스럼없이 다가가서 금방 친해져요. 에너지가 넘치고 긍정적이라 같이 있으면 기분이 좋아져요.\n\n게임이랑 애니메이션 좋아하는 덕후 기질이 있는데, 취미 공유하면서 같이 놀 수 있는 사람이면 최고래요!",
      height: 170,
      mbti: "ESFP",
      location: "서울 홍대",
      job: "게임회사",
      smoking: "비흡연",
      drinking: "주 1-2회",
      interests: ["게임", "애니/만화", "영화/드라마", "카페/맛집"],
      idealTypes: ["취미가 비슷한 사람", "웃음코드가 맞는 사람", "에너지 넘치는 사람"],
      dateStyles: ["편안한 실내데이트 (집/영화/보드게임)", "맛집탐방 (새로운 음식/술 한잔)"],
      datingStyles: ["빠르게 친해지는 타입", "리드받는 편"],
      contactStyles: ["카톡 빠른 답장파"],
      contactPreference: "카카오톡",
    },
  },
  {
    userEmail: "test2@buzzvil.com",
    registeredByEmail: "test2@buzzvil.com",
    data: {
      nickname: "노을",
      character: "fox",
      birthYear: 1992,
      bio: "오랜 친구를 소개해요.\n\n연상이지만 동안이라 나이를 잘 모르실 거예요. 성숙하고 포용력 있는 친구예요. 상대방 이야기 잘 들어주고 공감 능력이 뛰어나요.\n\n요즘 와인에 빠져서 와인바 투어 다니고 있어요. 같이 와인 마시면서 깊은 대화 나눌 수 있는 분이면 좋겠대요!",
      height: 163,
      mbti: "ENFJ",
      location: "서울 이태원",
      job: "외국계 기업",
      smoking: "비흡연",
      drinking: "주 1-2회",
      interests: ["와인/위스키", "여행", "카페/맛집", "영화/드라마"],
      idealTypes: ["성숙하고 배려심 있는 사람", "대화가 잘 통하는 사람", "유머러스한 사람"],
      dateStyles: ["맛집탐방 (새로운 음식/술 한잔)", "문화생활 즐기기 (전시회/공연/영화관람)"],
      datingStyles: ["천천히 알아가는 타입", "밀당보다 솔직한 편"],
      contactStyles: ["답장 느리지만 꾸준파"],
      contactPreference: "카카오톡",
    },
  },
  {
    userEmail: "test2@buzzvil.com",
    registeredByEmail: "test2@buzzvil.com",
    data: {
      nickname: "하늘",
      character: "bear",
      birthYear: 1995,
      bio: "군대 동기 소개시켜 드립니다!\n\n듬직하고 믿음직한 친구예요. 키도 크고 운동을 좋아해서 체격도 좋아요. 무뚝뚝해 보이는데 은근히 로맨틱한 면이 있어요.\n\n주말마다 농구하고 있고, 요즘은 요리에도 관심 생겨서 유튜브 보면서 이것저것 만들어보고 있대요. 같이 운동하고 맛있는 거 해먹을 수 있는 사람이면 좋겠대요!",
      height: 183,
      mbti: "ISTP",
      location: "서울 송파",
      job: "스타트업 개발자",
      smoking: "비흡연",
      drinking: "월 1-2회",
      interests: ["운동/헬스", "농구/풋살", "요리/베이킹", "게임"],
      idealTypes: ["활동적인 사람", "솔직하고 털털한 사람", "자기 일에 열정 있는 사람"],
      dateStyles: ["액티브한 야외데이트 (러닝/등산/피크닉)", "편안한 실내데이트 (집/영화/보드게임)"],
      datingStyles: ["밀당보다 솔직한 편", "리드하는 편"],
      contactStyles: ["할 말 있을 때만 연락파"],
      contactPreference: "전화번호",
    },
  },
];

async function main() {
  console.log("Seeding employees...");

  for (const employee of employees) {
    await prisma.user.upsert({
      where: { email: employee.email },
      update: {
        nickname: employee.nickname,
      },
      create: {
        email: employee.email,
        nickname: employee.nickname,
        emailVerified: true,
      },
    });
  }

  console.log(`Seeded ${employees.length} employees`);

  // 테스트 유저 추가
  console.log("Seeding test users...");
  for (const user of testUsers) {
    await prisma.user.upsert({
      where: { email: user.email },
      update: {
        nickname: user.nickname,
      },
      create: {
        email: user.email,
        nickname: user.nickname,
        emailVerified: true,
      },
    });
  }
  console.log(`Seeded ${testUsers.length} test users`);

  // 테스트 프로필 추가
  console.log("Seeding test profiles...");
  for (const profile of testProfiles) {
    const user = await prisma.user.findUnique({
      where: { email: profile.userEmail },
    });
    const registeredBy = await prisma.user.findUnique({
      where: { email: profile.registeredByEmail },
    });

    if (user && registeredBy) {
      // 이미 같은 닉네임 프로필이 있는지 확인
      const existing = await prisma.profile.findFirst({
        where: { userId: user.id, nickname: profile.data.nickname },
      });

      if (existing) {
        console.log(`  - ${profile.data.nickname} already exists, skipping`);
        continue;
      }

      await prisma.profile.create({
        data: {
          userId: user.id,
          registeredById: registeredBy.id,
          ...profile.data,
        },
      });
    }
  }
  console.log(`Seeded ${testProfiles.length} test profiles`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
