import {Blockchain, SandboxContract} from '@ton-community/sandbox';
import {toNano} from 'ton-core';
import {BusinessCard, User} from '../wrappers/BusinessCard';
import '@ton-community/test-utils';

describe('BusinessCard', () => {
  let blockchain: Blockchain;
  let businessCard: SandboxContract<BusinessCard>;

  beforeEach(async () => {
    blockchain = await Blockchain.create();

    const userInfo: User = {
      $$type: 'User',
      name: 'Liasun Yauheni',
      profession: 'Frontend Developer',
      bio: 'I\'ll add more later:)'
    };

    businessCard = blockchain.openContract(await BusinessCard.fromInit(userInfo));

    const deployer = await blockchain.treasury('deployer');

    const deployResult = await businessCard.send(
      deployer.getSender(),
      {
        value: toNano('0.05')
      },
      {
        $$type: 'Deploy',
        queryId: 0n
      }
    );

    expect(deployResult.transactions).toHaveTransaction({
      from: deployer.address,
      to: businessCard.address,
      deploy: true,
      success: true
    });
  });

  it('should deploy', async () => {
    // the check is done inside beforeEach
    // blockchain and businessCard are ready to use
  });
});
