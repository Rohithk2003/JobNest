import psutil


def close_google_processes():
    for proc in psutil.process_iter():
        if "google" in proc.name().lower():  # Assuming Google Chrome
            proc.terminate()  # Terminate the process
            # Alternatively, you can use proc.kill() to forcefully kill the process


close_google_processes()
