# 🖥️ asc hardware

Show the machine's hardware: bare metal or virtual, CPU, board, memory modules, disks, GPUs and the current temperature of every sensor.

## Usage

```
asc hardware [--json]
```

| Flag | Meaning |
|---|---|
| `--json` | Print one machine-readable JSON document instead of the table |

Read in-process, like the metrics block of `asc status` — it does not need a running daemon. Without `--json` the output is a short report:

```
Machine: bare metal — ASUS System Product Name
CPU: Intel(R) Xeon(R) E-2288G CPU @ 3.70GHz · 1 socket(s), 8 cores / 16 threads · 5.0 GHz
Board: ASUSTeK COMPUTER INC. PRIME Z390-P · BIOS American Megatrends Inc. 2401
Memory: 32.0 GiB
  DIMM_A1    16.0 GiB · DDR4 · 2933 MT/s · Samsung · M378A2K43DB1-CTD
Disks:
  nvme0n1      1.8 TiB  nvme    Samsung SSD 990 PRO 2TB
GPUs:
  0000:01:00.0  NVIDIA GeForce RTX 3090  24.0 GiB
    can be attached to a container
Temperatures:
  cpu      cpu            Package id 0           47.0 °C
```

- The GPU's **PCI address** (`0000:01:00.0`) is the value an app's `gpus` setting takes — `asc app settings <id>`, category `gpus`.
- On a virtual machine the DMI strings, memory modules and sensors are often hidden; those lines say so instead of showing made-up values.

## See also

- [🖥️ Hardware inventory and sensors](/cli/hardware)
- [📋 asc status](/commands/status)
