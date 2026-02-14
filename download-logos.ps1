# Automated Logo Downloader for Fillezy Client Logos
# This script downloads official logos from public CDNs and logo databases

$logoDir = "c:\laragon\www\fill\public\logos\clients"

# Create directory if it doesn't exist
if (-not (Test-Path $logoDir)) {
    New-Item -ItemType Directory -Path $logoDir -Force
    Write-Host "Created directory: $logoDir" -ForegroundColor Green
}

# Logo URLs from public sources (CDNs, logo databases, Wikipedia)
$logos = @{
    # E-Commerce
    "amazon" = "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
    "snapdeal" = "https://logos-world.net/wp-content/uploads/2021/03/Snapdeal-Logo.png"
    "nykaa" = "https://logos-world.net/wp-content/uploads/2022/04/Nykaa-Logo.png"
    "purplle" = "https://cdn.worldvectorlogo.com/logos/purplle.svg"
    "pepperfry" = "https://logos-world.net/wp-content/uploads/2022/12/Pepperfry-Logo.png"
    
    # Logistics
    "delhivery" = "https://logos-world.net/wp-content/uploads/2023/01/Delhivery-Logo.png"
    "dhl" = "https://upload.wikimedia.org/wikipedia/commons/a/ac/DHL_Logo.svg"
    
    # Fashion & Apparel
    "adidas" = "https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg"
    "reebok" = "https://upload.wikimedia.org/wikipedia/commons/3/39/Reebok_logo.svg"
    "lifestyle" = "https://logos-world.net/wp-content/uploads/2023/02/Lifestyle-Logo.png"
    "louis-philippe" = "https://logos-world.net/wp-content/uploads/2023/01/Louis-Philippe-Logo.png"
    "charles-and-keith" = "https://logos-world.net/wp-content/uploads/2022/12/Charles-Keith-Logo.png"
    "aldo" = "https://logos-world.net/wp-content/uploads/2022/12/Aldo-Logo.png"
    
    # Beauty & Personal Care
    "the-body-shop" = "https://upload.wikimedia.org/wikipedia/commons/8/8e/The_Body_Shop_logo.svg"
    "bath-and-body-works" = "https://logos-world.net/wp-content/uploads/2020/12/Bath-Body-Works-Logo.png"
    "victorias-secret" = "https://upload.wikimedia.org/wikipedia/commons/c/ce/Victoria%27s_Secret_logo.svg"
    "vlcc" = "https://logos-world.net/wp-content/uploads/2023/01/VLCC-Logo.png"
    
    # Industrial & Automotive
    "bosch" = "https://upload.wikimedia.org/wikipedia/commons/7/70/Bosch-logo.svg"
    "honda" = "https://upload.wikimedia.org/wikipedia/commons/7/76/Honda_logo.svg"
    "hp" = "https://upload.wikimedia.org/wikipedia/commons/a/ad/HP_logo_2012.svg"
    "caterpillar" = "https://upload.wikimedia.org/wikipedia/commons/8/8c/Caterpillar_logo.svg"
    "eaton" = "https://upload.wikimedia.org/wikipedia/commons/5/5f/Eaton_Corporation_logo.svg"
    "skf" = "https://logos-world.net/wp-content/uploads/2023/02/SKF-Logo.png"
    "smc" = "https://logos-world.net/wp-content/uploads/2023/02/SMC-Corporation-Logo.png"
    "man" = "https://upload.wikimedia.org/wikipedia/commons/8/8b/MAN_logo.svg"
    "mitutoyo" = "https://logos-world.net/wp-content/uploads/2023/02/Mitutoyo-Logo.png"
    "thermo-king" = "https://logos-world.net/wp-content/uploads/2023/02/Thermo-King-Logo.png"
    
    # Conglomerates
    "aditya-birla" = "https://logos-world.net/wp-content/uploads/2023/01/Aditya-Birla-Group-Logo.png"
}

Write-Host "`nDownloading client logos..." -ForegroundColor Cyan
Write-Host "Target directory: $logoDir`n" -ForegroundColor Yellow

$successCount = 0
$failCount = 0

foreach ($logo in $logos.GetEnumerator()) {
    $fileName = "$($logo.Key).png"
    $outputPath = Join-Path $logoDir $fileName
    
    try {
        Write-Host "Downloading: $($logo.Key)..." -NoNewline
        
        # Download with progress
        $ProgressPreference = 'SilentlyContinue'
        Invoke-WebRequest -Uri $logo.Value -OutFile $outputPath -ErrorAction Stop
        $ProgressPreference = 'Continue'
        
        Write-Host " ✓" -ForegroundColor Green
        $successCount++
    }
    catch {
        Write-Host " ✗ Failed" -ForegroundColor Red
        Write-Host "  Error: $($_.Exception.Message)" -ForegroundColor DarkRed
        $failCount++
    }
    
    Start-Sleep -Milliseconds 500  # Be nice to servers
}

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "Download Summary:" -ForegroundColor Cyan
Write-Host "  Success: $successCount" -ForegroundColor Green
Write-Host "  Failed:  $failCount" -ForegroundColor Red
Write-Host "========================================`n" -ForegroundColor Cyan

if ($failCount -gt 0) {
    Write-Host "Note: Some logos failed to download." -ForegroundColor Yellow
    Write-Host "You can manually download them from:" -ForegroundColor Yellow
    Write-Host "  - https://logos-world.net/" -ForegroundColor Yellow
    Write-Host "  - https://worldvectorlogo.com/" -ForegroundColor Yellow
    Write-Host "  - https://seeklogo.com/`n" -ForegroundColor Yellow
}

Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Check the logos in: $logoDir" -ForegroundColor White
Write-Host "2. Run 'npm run dev' to test locally" -ForegroundColor White
Write-Host "3. Commit and push: git add public/logos/clients && git commit -m 'feat: add official client logos' && git push" -ForegroundColor White

Read-Host "`nPress Enter to exit"
