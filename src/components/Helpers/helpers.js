const {
    mnemonicGenerate,
    mnemonicToMiniSecret,
    mnemonicValidate,
    ed25519PairFromSeed
  } = require('@polkadot/util-crypto');
  import * as SecureStore from 'expo-secure-store';


export async function generateMnemonic ( ) {
    const mnemonicAlice = mnemonicGenerate();

    console.log(`Generated mnemonic: ${mnemonicAlice}`);
    await SecureStore.setItemAsync('mnemonic', `${mnemonicAlice}`);
    await SecureStore.setItemAsync('onboardStatus', `true`);

  
}