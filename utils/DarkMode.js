import { useTheme } from "next-themes";

// ダークモードボタン

const DarkMode = () => {
  const { theme, setTheme } = useTheme("light");　// デフォルトテーマをlightに設定

  return (
    <button
      className='p-2 mx-2 text-sm font-medium text-gray-800 rounded-lg change dark:text-white hover:bg-gray-100 lg:hover:bg-gray-200 lg:px-2 lg:py-2 dark:hover:bg-[#373a3c] '
      onClick={() => (theme == "dark" ? setTheme("light") : setTheme("dark"))}　// クリックするとsetThemeを通じてテーマがかわる
    >
      <svg className='w-6 h-6' fill='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg' strokeWidth='1.5' stroke='currentColor'>
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z'
        />
      </svg>
    </button>
  );
};
export default DarkMode;

/* ダークモードを実装した方法
tailwind.config.jsでdarkMode: "class"に設定し、next-themesのuseTheme関数を使用
ダークモードボタンを押すと、setTheme(lightまたはdark)でテーマを保存
Tailwind CSSのclassNameでdark:コードを入れる
*/
