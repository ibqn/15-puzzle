const board = document.getElementById('board');

const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

let blocks = Array.from({ length: 16 }, (_, index) => (index ? index : '')).map(
  (index) => {
    const piece = document.createElement('div');
    piece.classList.add('piece');
    piece.dataset.index = index;
    piece.innerText = index;
    return piece;
  }
);

const solutionExists = () => {
  let n = 0;

  // console.log(blocks.map((b) => b.innerText));

  for (let i = 1; i < blocks.length; i++) {
    const ni = +blocks[i].innerText;

    // console.log('ni', ni);

    if (ni === 0) {
      n += Math.floor(i / 4) + 1;
      // console.log('row', Math.floor(i / 4) + 1);
      continue;
    }

    for (let j = 0; j < i; j++) {
      const nj = +blocks[j].innerText;
      if (nj !== 0 && nj > ni) {
        // console.log('.', nj, ni);
        n += 1;
      }
    }
  }

  console.log('n', n, n % 2 === 0);
  return n % 2 === 0;
};

const swap = (a, b) => {
  const index = a.dataset.index;

  a.dataset.index = b.dataset.index;
  a.innerText = b.dataset.index;

  b.dataset.index = index;
  b.innerText = index;
};

const handleClick = (block, index) => () => {
  const i = index % 4;
  const j = Math.floor(index / 4);

  if (block.dataset.index === '') {
    return;
  }

  //   console.log("clicked", index, i, j);

  //   const blocks = document.querySelectorAll("#board > .piece");

  for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
      const idx = i + x + 4 * (y + j);
      if (i + x < 4 && blocks[idx]?.dataset?.index === '' && !x ^ !y) {
        // console.log("match", idx);
        swap(block, blocks[idx]);
        return;
      }
    }
  }
};

do {
  blocks = shuffle(blocks);
} while (!solutionExists());

blocks.forEach((block, index) => {
  block.addEventListener('click', handleClick(block, index));

  board.append(block);
});

// solutionExists();
