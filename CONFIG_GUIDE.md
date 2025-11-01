# Configuration Guide

## Quick Start

To update your US Map, simply edit `config.json` and change the status for any state:

```json
{
  "states": {
    "AL": "to-specify",
    "AK": "done",
    "AZ": "done",
    ...
  }
}
```

Save the file, refresh your browser, and **everything updates automatically**!

## What Updates Automatically

When you change `config.json`, the application automatically recalculates and updates:

### ✅ US Map Colors
- Each state is colored based on its status
- Colors update instantly when you change a state's status

### ✅ Status Counts
- Filter buttons show the count for each status
- Example: "Done (30)" → "Done (35)"

### ✅ Percentages
- Legend shows percentage for each status
- Stats panel shows completion percentage
- All calculated from your config

### ✅ Progress Chart
- Donut chart recalculates all segments automatically
- Proportions adjust based on status distribution

### ✅ Summary Stats
- **Total States**: Counts all states in config
- **Completed**: Shows "done" count and percentage
- **Remaining**: Calculates automatically (total - done)

## Available Status Values

You can set each state to one of these values:

- `"done"` - Completed (green)
- `"in-progress"` - Currently working on (blue)
- `"ready"` - Ready to start (yellow)
- `"to-specify"` - Needs specification (orange)
- `"todo"` - Not started (gray)

## Example: Updating State Status

Let's say you completed work on Florida and Tennessee:

**Before:**
```json
{
  "states": {
    "FL": "todo",
    "TN": "in-progress",
    ...
  }
}
```

**After:**
```json
{
  "states": {
    "FL": "done",
    "TN": "done",
    ...
  }
}
```

**Result:**
- Florida and Tennessee turn green on the map
- "Done" count increases from 30 to 32
- "Done" filter button shows "(32)" instead of "(30)"
- Chart updates to show 64% done (32/50)
- Stats panel shows "Completed: 32 (64%)"

## All US State Codes

Here's the complete list of state codes you can configure:

```
AL - Alabama          KY - Kentucky         ND - North Dakota
AK - Alaska           LA - Louisiana        OH - Ohio
AZ - Arizona          ME - Maine            OK - Oklahoma
AR - Arkansas         MD - Maryland         OR - Oregon
CA - California       MA - Massachusetts    PA - Pennsylvania
CO - Colorado         MI - Michigan         RI - Rhode Island
CT - Connecticut      MN - Minnesota        SC - South Carolina
DE - Delaware         MS - Mississippi      SD - South Dakota
FL - Florida          MO - Missouri         TN - Tennessee
GA - Georgia          MT - Montana          TX - Texas
HI - Hawaii           NE - Nebraska         UT - Utah
ID - Idaho            NV - Nevada           VT - Vermont
IL - Illinois         NH - New Hampshire    VA - Virginia
IN - Indiana          NJ - New Jersey       WA - Washington
IA - Iowa             NM - New Mexico       WV - West Virginia
KS - Kansas           NY - New York         WI - Wisconsin
                      NC - North Carolina   WY - Wyoming
```

## Tips

- **Keep all 50 states**: Make sure your config includes all 50 US states
- **Valid JSON**: Maintain proper JSON format (commas, quotes, brackets)
- **Use valid status values**: Only use the 5 status values listed above
- **Hard refresh**: If changes don't appear, try Ctrl+F5 (Windows) or Cmd+Shift+R (Mac)

## Common Tasks

### Mark a state as completed
```json
"CA": "done"
```

### Mark a state as in progress
```json
"TX": "in-progress"
```

### Mark multiple states as ready to start
```json
"NY": "ready",
"NJ": "ready",
"PA": "ready"
```

### Reset a state to not started
```json
"FL": "todo"
```

## Validation

The application handles errors gracefully:
- If `config.json` is missing, it falls back to default data
- If a state code is missing, it's skipped
- If JSON is invalid, check the browser console for errors
- Invalid status values default to gray

## For Developers

### Files Modified
- **`config.json`** - Your editable configuration (state-to-status mapping)
- **`js/config-loader.js`** - Loads config and calculates statistics
- **`js/main.js`** - Passes config to map and UI components
- **`js/map-svg.js`** - Colors map based on config

### How It Works

1. **Load**: `ConfigLoader.loadConfig()` fetches `config.json`
2. **Calculate**: `ConfigLoader.calculateStats()` counts statuses and calculates percentages
3. **Render Map**: `colorizeMap(config)` applies colors to each state
4. **Update UI**: `updateUI()` refreshes counts, percentages, and chart

### Extending

To add new status types:
1. Add to `config.json` state values
2. Define color in `js/data.js` → `STATUS_COLORS`
3. Define label in `js/data.js` → `STATUS_LABELS`
4. Add to filter buttons in `index.html`

## Troubleshooting

**Map doesn't update after config change:**
- Hard refresh your browser (Ctrl+F5 or Cmd+Shift+R)
- Check browser console for JSON parsing errors
- Verify config.json is valid JSON

**States showing wrong colors:**
- Check that status values match exactly: "done", "in-progress", "ready", "to-specify", "todo"
- Status values are case-sensitive
- Verify state codes are uppercase (e.g., "CA" not "ca")

**Counts don't match:**
- Ensure all 50 states are in config.json
- Check for duplicate state codes
- Verify no typos in state codes
