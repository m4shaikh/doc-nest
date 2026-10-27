import Image from "next/image";
import Link from "next/link";
import { getRecentFiles, getTotalSpaceUsed } from "@/lib/actions/files.action";
import {
  getFileIcon,
  getFileSize,
  getUsageSummary,
  parseDateTime,
} from "@/lib/utils";
// Uncomment if you want your 3-dot action menu on each row:
// import DropDown from "@/components/DropDown";

export default async function Home() {
  // Fetch storage stats and recent files in parallel
  const [files, totalSpaceData] = await Promise.all([
    getRecentFiles(10),
    getTotalSpaceUsed(),
  ]);

  const totalSpace = totalSpaceData || {
    image: { size: 0, latestDate: "" },
    document: { size: 0, latestDate: "" },
    video: { size: 0, latestDate: "" },
    audio: { size: 0, latestDate: "" },
    other: { size: 0, latestDate: "" },
    used: 0,
    all: 2 * 1024 * 1024 * 1024,
  };

  const recentFiles = files?.documents || files || [];
  const usageSummary = getUsageSummary(totalSpace);
  const usedPercentage = Math.min(
    Number(((totalSpace.used / totalSpace.all) * 100).toFixed(1)),
    100
  );

  return (
    <main className="rounded-2xl h-full">
      <div className="flex flex-col lg:flex-row bg-card w-full h-full">
        
        {/* Left Column: Storage Meter + Category Cards */}
        <div className="flex w-full flex-col">
          <div className="flex-1 bg-primary text-primary-foreground rounded-xl m-4 p-6 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold">Available Storage</h2>
                <p className="text-sm opacity-90 mt-1">
                  {getFileSize(totalSpace.used)} / {getFileSize(totalSpace.all)}
                </p>
              </div>
              <div className="text-3xl font-extrabold">{usedPercentage}%</div>
            </div>

            <div className="w-full bg-black/20 h-3 rounded-full mt-6 overflow-hidden">
              <div
                className="bg-white h-full rounded-full transition-all duration-500"
                style={{ width: `${usedPercentage}%` }}
              />
            </div>
          </div>

          <div className="flex-1 w-full p-4 pt-0 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {usageSummary.map((item) => {
              const dt = item.latestDate ? parseDateTime(item.latestDate) : null;

              return (
                <Link
                  href={item.url}
                  key={item.title}
                  className="bg-sidebar hover:opacity-90 transition rounded-xl p-5 flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Image
                        src={item.icon}
                        alt={item.title}
                        width={36}
                        height={36}
                      />
                      <span className="font-semibold text-base">
                        {item.title}
                      </span>
                    </div>
                    <span className="text-sm font-bold">
                      {getFileSize(item.size)}
                    </span>
                  </div>

                  <div className="mt-4 pt-3 border-t border-border/40 text-xs text-muted-foreground flex justify-between items-center">
                    <span>Last update</span>
                    <span className="font-medium text-foreground">
                      {dt
                        ? `${dt.hour12}:${dt.minute} ${dt.ampm}, ${dt.day} ${dt.monthNameShort}`
                        : "No files yet"}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Right Column: Recent Files Uploaded */}
        <div className="w-full bg-sidebar m-4 rounded-xl p-6 flex flex-col overflow-hidden">
          <h2 className="text-xl font-bold mb-5">Recent files uploaded</h2>

          {recentFiles.length > 0 ? (
            <ul className="flex flex-col gap-4 overflow-y-auto pr-1">
              {recentFiles.map((file: any) => {
                const dt = parseDateTime(file.$createdAt);
                const isImage = file.type === "image" && file.url;

                return (
                  <li
                    key={file.$id}
                    className="flex items-center justify-between gap-3 p-2.5 rounded-lg hover:bg-card/60 transition"
                  >
                    <Link
                      href={file.url}
                      target="_blank"
                      className="flex items-center gap-3.5 min-w-0 flex-1"
                    >
                      {/* Thumbnail / File Type Icon */}
                      <div className="w-11 h-11 rounded-full bg-card flex items-center justify-center shrink-0 overflow-hidden">
                        <Image
                          src={
                            isImage
                              ? file.url
                              : getFileIcon(file.extension, file.type)
                          }
                          alt={file.name}
                          width={isImage ? 44 : 26}
                          height={isImage ? 44 : 26}
                          className={
                            isImage ? "w-full h-full object-cover" : "object-contain"
                          }
                        />
                      </div>

                      {/* File Name, Date & Size */}
                      <div className="flex flex-col min-w-0 flex-1">
                        <p className="text-sm font-semibold truncate">
                          {file.name}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                          <span>
                            {dt
                              ? `${dt.hour12}:${dt.minute} ${dt.ampm}, ${dt.day} ${dt.monthNameShort}`
                              : ""}
                          </span>
                          <span>•</span>
                          <span>{getFileSize(Number(file.size))}</span>
                        </div>
                      </div>
                    </Link>

                    {/* Optional: Add your existing DropDown component here */}
                    {/* <DropDown file={file} /> */}
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="flex-1 flex items-center justify-center text-sm text-muted-foreground">
              No files uploaded yet
            </div>
          )}
        </div>

      </div>
    </main>
  );
}