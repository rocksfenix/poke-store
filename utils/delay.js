
/**
 * Helper function to simulate http delay
 */
export default async function delay (time = 2000) {
  return new Promise(resolve => {
    setTimeout(() => resolve(), time)
  });
}