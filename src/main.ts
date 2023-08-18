import MainApp from './MainApp';

async function main() {
  const args = process.argv.slice(2);

  if (args.length < 2 || args.length > 3) {
    console.log('Usage: ts-node src/main.ts <file-name> <encode|decode> [<compress|no-compress>]');
    return;
  }

  const fileName = args[0];
  const option = args[1];

  await MainApp.run(fileName, option,);
}

main();