export default function Header() {
  const currentURL = window.location.href;

  return (
    <div className="flex flex-row p-4 header-section rounded-xl my-4">
      <p className="text-3xl text-slate-200 font-semibold grow">
        {currentURL.includes("/student-chat") ? "PMBOK_Guider-Chat" : "PMBOK_Quiz-Chat"}
      </p>
    </div>
  );
}
