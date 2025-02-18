// src/utils/parseSRT.ts
export const parseSRT = (srtText: string) => {
    const captions: any[] = [];
    const lines = srtText.split('\n');
    let currentCaption: any = { id: 0, start: '', end: '', text: '' };
  
    lines.forEach((line) => {
      if (line.trim() === '') {
        if (currentCaption.id > 0) {
          captions.push(currentCaption);
        }
        currentCaption = { id: currentCaption.id + 1, start: '', end: '', text: '' };
      } else if (line.includes('-->')) {
        const times = line.split(' --> ');
        currentCaption.start = times[0].trim();
        currentCaption.end = times[1].trim();
      } else {
        currentCaption.text += line.trim() + ' ';
      }
    });
  
    return captions;
  };
  
  