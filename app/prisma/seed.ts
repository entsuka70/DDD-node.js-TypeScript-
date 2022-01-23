import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const team = await prisma.team.createMany({
    data: [
      {
        id: '6e911532-72ee-4c57-bf90-15559c2117a6',
        belong: true,
        team_name: 111,
      },
      {
        id: 'd7febb8d-1014-4f64-94e5-298229476136',
        belong: false,
        team_name: 222,
      },
      {
        id: 'e0fd7876-3940-44ec-9e1d-a254207c5c7b',
        belong: false,
        team_name: 333,
      },
    ],
    skipDuplicates: true,
  });

  const pair = await prisma.pair.createMany({
    data: [
      {
        id: '79599a05-6a30-4ef2-b429-89de2a1a086d',
        team_id: '6e911532-72ee-4c57-bf90-15559c2117a6',
        pair_name: 'a',
        belong: false,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 'df26a64c-9f9c-4afd-baec-e83c71dc5f57',
        team_id: '6e911532-72ee-4c57-bf90-15559c2117a6',
        pair_name: 'b',
        belong: false,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: '5c59c644-ab8f-45d4-89e0-7b693df967bb',
        team_id: '6e911532-72ee-4c57-bf90-15559c2117a6',
        pair_name: 'c',
        belong: false,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 'f1f62c24-aff9-4662-a2dd-015004056c3f',
        team_id: '6e911532-72ee-4c57-bf90-15559c2117a6',
        pair_name: 'd',
        belong: false,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ],
    skipDuplicates: true,
  });

  const user = await prisma.user.createMany({
    data: [
      {
        id: 'e6324122-b047-400f-a1db-9084d19555f6',
        pair_id: '79599a05-6a30-4ef2-b429-89de2a1a086d',
        team_id: '6e911532-72ee-4c57-bf90-15559c2117a6',
        user_name: 'user_1',
        email: 'hoge@mail.com',
        status: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: '9991c46f-9496-49fb-b093-c5a1a6900056',
        pair_id: '79599a05-6a30-4ef2-b429-89de2a1a086d',
        team_id: '6e911532-72ee-4c57-bf90-15559c2117a6',
        user_name: 'user_2',
        email: 'hoge2@mail.com',
        status: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: '8ebaf292-82f3-4fb1-b028-510a0508c7b1',
        pair_id: '79599a05-6a30-4ef2-b429-89de2a1a086d',
        team_id: '6e911532-72ee-4c57-bf90-15559c2117a6',
        user_name: 'user_3',
        email: 'hoge3@mail.com',
        status: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: '961d5cc9-73f6-4e4b-a8e7-c2fc4fff2dbb',
        pair_id: '79599a05-6a30-4ef2-b429-89de2a1a086d',
        team_id: '6e911532-72ee-4c57-bf90-15559c2117a6',
        user_name: 'user_4',
        email: 'hoge4@mail.com',
        status: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ],
    skipDuplicates: true,
  });

  const issue = await prisma.issue.createMany({
    data: [
      {
        id: '15d754a7-8344-4551-9792-da910905129d',
        issue_name: '課題1',
        issue_no: 1,
        issue_group: 1,
      },
      {
        id: '89ef8770-fa04-4645-8f7a-22ac0ccadf42',
        issue_name: '課題2',
        issue_no: 2,
        issue_group: 2,
      },
      {
        id: '1b1e0bc1-d420-47ba-80fc-8d51aacc8cae',
        issue_name: '課題3',
        issue_no: 3,
        issue_group: 3,
      },
      {
        id: '8c1bb877-97a3-4730-97f3-48072d72c6e0',
        issue_name: '課題4',
        issue_no: 4,
        issue_group: 4,
      },
    ],
    skipDuplicates: true,
  });

  const userIssue = await prisma.userIssue.createMany({
    data: [
      {
        id: '514b96d3-06ba-44b8-ac71-877e996c16c2',
        user_id: 'e6324122-b047-400f-a1db-9084d19555f6',
        issue_id: '15d754a7-8344-4551-9792-da910905129d',
        progress: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: '37613fdb-0421-4a15-a14e-8725415e1604',
        user_id: '9991c46f-9496-49fb-b093-c5a1a6900056',
        issue_id: '15d754a7-8344-4551-9792-da910905129d',
        progress: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: '082f22fd-ba05-4ae1-ac77-93beb99d56d8',
        user_id: '8ebaf292-82f3-4fb1-b028-510a0508c7b1',
        issue_id: '15d754a7-8344-4551-9792-da910905129d',
        progress: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: '409f5b26-65c9-40f6-99ea-d5de2fdafc9b',
        user_id: '961d5cc9-73f6-4e4b-a8e7-c2fc4fff2dbb',
        issue_id: '15d754a7-8344-4551-9792-da910905129d',
        progress: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ],
    skipDuplicates: true,
  });

  console.log({
    team,
    pair,
    user,
    issue,
    userIssue,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  .finally(async () => {
    await prisma.$disconnect();
  });
