# Configuration Guide

## Quick Start

To update your US Map, simply edit `config.json` and change the counts:

```json
{
  "done": 30,
  "in-progress": 1,
  "ready": 9,
  "to-specify": 9,
  "todo": 1
}
```

**That's it!** Save the file, refresh your browser, and everything updates automatically!

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

## Status Categories

The five status categories are:

- `done` - Completed states (green) - appear first on the map
- `in-progress` - Currently working on (blue)
- `ready` - Ready to start (yellow)
- `to-specify` - Needs specification (orange)
- `todo` - Not started (gray) - appear last on the map

## Example: Completing More States

Let's say you completed 5 more states:

**Before:**
```json
{
  "done": 30,
  "in-progress": 1,
  "ready": 9,
  "to-specify": 9,
  "todo": 1
}
```

**After:**
```json
{
  "done": 35,
  "in-progress": 1,
  "ready": 4,
  "to-specify": 9,
  "todo": 1
}
```

**Result:**
- 5 more states turn green on the map
- "Done" count increases from 30 to 35
- "Ready" count decreases from 9 to 4
- "Done" filter button shows "(35)" instead of "(30)"
- Chart updates to show 70% done (35/50)
- Stats panel shows "Completed: 35 (70%)"

## How States Are Assigned

States are automatically assigned to status categories in **alphabetical order**:

1. First X states → `done` (green)
2. Next Y states → `in-progress` (blue)
3. Next Z states → `ready` (yellow)
4. Next W states → `to-specify` (orange)
5. Remaining states → `todo` (gray)

**Example:** With the default config:
- First 30 states (AL, AK, AZ... OH, OK, OR, PA...) → Done (green)
- Next 1 state → In Progress (blue)
- Next 9 states → Ready (yellow)
- Next 9 states → To Specify (orange)
- Last 1 state → To Do (gray)

## Tips

- **Total must equal 50**: All counts should add up to 50 (total US states)
- **Valid JSON**: Keep proper JSON format (commas, no trailing comma on last item)
- **Whole numbers only**: Use integers (e.g., 30, not 30.5)
- **Hard refresh**: If changes don't show, try Ctrl+F5 (Windows) or Cmd+Shift+R (Mac)

## Common Tasks

### Complete 5 more states
Change `"done": 30` to `"done": 35` and reduce another count by 5

### Start working on 2 new states
Change `"in-progress": 1` to `"in-progress": 3` and reduce another count by 2

### Mark states as ready to work on
Increase `"ready"` count and decrease `"todo"` or `"to-specify"` count

### Start from scratch
```json
{
  "done": 0,
  "in-progress": 0,
  "ready": 0,
  "to-specify": 0,
  "todo": 50
}
```

## Validation

The application handles errors gracefully:
- If `config.json` is missing, all counts default to 0
- If counts don't add up to 50, remaining states default to `todo`
- If JSON is invalid, check the browser console for errors
- Negative numbers are treated as 0

## For Developers

### Files Modified
- **`config.json`** - Simple count-based configuration
- **`js/config-loader.js`** - Loads config, calculates stats, generates state mapping
- **`js/main.js`** - Orchestrates loading and rendering
- **`js/map-svg.js`** - Colors map based on generated state mapping

### How It Works

1. **Load**: `ConfigLoader.loadConfig()` fetches `config.json`
2. **Calculate Stats**: `ConfigLoader.calculateStats()` computes totals and percentages
3. **Generate Mapping**: `ConfigLoader.generateStateMapping()` assigns states to statuses in alphabetical order
4. **Render Map**: `colorizeMap(stateMapping)` applies colors to each state
5. **Update UI**: `updateUI()` refreshes counts, percentages, legend, and chart

### State Assignment Logic

```javascript
// States are assigned in alphabetical order
const statusOrder = ['done', 'in-progress', 'ready', 'to-specify', 'todo'];

// Example with config { done: 30, in-progress: 1, ... }
// AL, AK, AZ, ... (first 30) → done
// AR (31st state) → in-progress
// CA, CO, CT, ... (next 9) → ready
// etc.
```

### Extending

To add new status types:
1. Add property to `config.json` with count
2. Define color in `js/data.js` → `STATUS_COLORS`
3. Define label in `js/data.js` → `STATUS_LABELS`
4. Add to `statusOrder` in `config-loader.js`
5. Add filter button in `index.html`

## Troubleshooting

**Map doesn't update after config change:**
- Hard refresh your browser (Ctrl+F5 or Cmd+Shift+R)
- Check browser console for JSON parsing errors
- Verify config.json is valid JSON

**Counts don't add up correctly:**
- Make sure all numbers are positive integers
- Total should equal 50 for all US states
- Remove any decimal points

**Percentages seem wrong:**
- Percentages are rounded to whole numbers
- They're calculated from the total of all counts
- If counts don't sum to 50, percentages reflect actual total
